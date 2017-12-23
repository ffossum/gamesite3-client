/* @flow */
import type { Action } from '../../actions';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';
import type { State } from '../root';
import type {
  EnterSpectatorRoomAction,
  EnterRoomAction,
  ExitRoomAction,
  CancelGameAction,
  StartGameAction,
} from './gameRoomActions';
import { clearChat } from '../chat/chatActions';
import {
  ENTER_SPECTATOR,
  EXIT_SPECTATOR,
  ENTER_ROOM,
  EXIT_ROOM,
  JOIN_GAME,
  LEAVE_GAME,
  CANCEL_GAME,
  START_GAME,
} from './gameRoomActions';
import {
  FETCH_GAME_DATA_REQUEST,
  fetchGameDataRequest,
  fetchGameDataSuccess,
} from './gameDataActions';
import deepstreamEventToActions from '../../deepstreamEventToActions';
import type { FetchGameDataRequestAction } from './gameDataActions';

import type DeepstreamClient from '../../deepstreamClient';

type Dependencies = {
  deepstreamClient: DeepstreamClient,
  ajax: {
    getJSON: string => Observable<*>,
  },
};

function enterRoomEpic(action$: Observable<*>) {
  return action$
    .filter(
      (action: Action) =>
        action.type === ENTER_ROOM && action.payload.shouldFetchGameData,
    )
    .map((action: EnterRoomAction) =>
      fetchGameDataRequest(action.payload.gameId),
    );
}

function fetchGameDataEpic(
  action$: Observable<*>,
  store: Store<State, *>,
  { ajax }: Dependencies,
) {
  return action$
    .filter(action => action.type === FETCH_GAME_DATA_REQUEST)
    .switchMap((action: FetchGameDataRequestAction) => {
      const gameId = action.payload;
      return ajax
        .getJSON(`/api/game/${gameId}`)
        .flatMap(game => {
          if (game) {
            return [fetchGameDataSuccess(game)];
          } else {
            return [];
          }
        })
        .catch(() => Observable.empty());
    });
}

function exitRoomEpic(action$: Observable<*>) {
  return action$
    .filter(action => action.type === EXIT_ROOM)
    .flatMap((action: ExitRoomAction) => {
      const { gameId, isInGame } = action.payload;
      if (!isInGame) {
        const channelName = `game:${gameId}`;
        return Observable.of(clearChat(channelName));
      } else {
        return Observable.empty();
      }
    });
}

function gameRoomEpic(
  action$: Observable<*>,
  store: Store<State, *>,
  { deepstreamClient }: Dependencies,
) {
  return Observable.merge(
    action$
      .filter(action => action.type === ENTER_SPECTATOR)
      .flatMap((action: EnterSpectatorRoomAction) => {
        const gameId = action.payload;
        return deepstreamClient
          .subscribe('spectate:' + gameId)
          .flatMap(deepstreamEventToActions)
          .takeUntil(
            action$.filter(
              action =>
                action.type === EXIT_SPECTATOR && action.payload === gameId,
            ),
          );
      }),
    action$
      .filter(action => action.type === JOIN_GAME)
      .do(action => {
        deepstreamClient.make('join-game', action.payload);
      })
      .ignoreElements(),
    action$
      .filter(action => action.type === LEAVE_GAME)
      .do(action => {
        deepstreamClient.make('leave-game', action.payload);
      })
      .ignoreElements(),
    action$
      .filter(action => action.type === CANCEL_GAME)
      .do((action: CancelGameAction) => {
        const gid = action.payload.gameId;
        const uid = action.payload.userId;
        deepstreamClient.make('cancel-game', { gid, uid });
      })
      .ignoreElements(),
    action$
      .filter(action => action.type === START_GAME)
      .do((action: StartGameAction) => {
        const gid = action.payload.gameId;
        const uid = action.payload.userId;
        deepstreamClient.make('start-game', { gid, uid });
      })
      .ignoreElements(),
  );
}

export default combineEpics(
  enterRoomEpic,
  fetchGameDataEpic,
  exitRoomEpic,
  gameRoomEpic,
);

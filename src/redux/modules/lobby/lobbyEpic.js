/* @flow */
import { Observable } from 'rxjs';
import {
  CREATE_GAME_REQUEST,
  ENTER_LOBBY,
  EXIT_LOBBY,
  gameCreated,
  gameUpdated,
  refreshLobby,
} from './lobbyActions';
import type { CreateGameRequestAction } from './lobbyActions';
import type { GameDataState } from '../games/gamesReducer';
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';
import type DeepstreamClient from '../../deepstreamClient';
import { indexBy } from 'ramda';

type Dependencies = {
  deepstreamClient: DeepstreamClient,
  history: any,
};
function enterLobbyEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$.filter(action => action.type === ENTER_LOBBY).flatMap(() =>
    Observable.merge(
      Observable.fromPromise(
        deepstreamClient
          .make('refresh-lobby')
          .then((gamesArray: GameDataState[]) => {
            const lobby = indexBy(game => game.id, gamesArray);
            return refreshLobby(lobby);
          }),
      ),
      deepstreamClient
        .subscribe('lobby')
        .flatMap(data => {
          switch (data.t) {
            case 'create-game':
              return [gameCreated(data.p)];
            case 'game-updated':
              return [gameUpdated(data.p)];
            default:
              return [];
          }
        })
        .takeUntil(action$.filter(action => action.type === EXIT_LOBBY)),
    ),
  );
}

function createGameEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient, history }: Dependencies,
) {
  return action$
    .filter(action => action.type === CREATE_GAME_REQUEST)
    .flatMap((action: CreateGameRequestAction) => {
      const uid = action.payload.userId;
      return Observable.fromPromise(
        deepstreamClient.make('create-game', { uid }).then(game => {
          history.push(`/game/${game.id}`);
          return gameCreated(game);
        }),
      ).catch(Observable.empty()); // TODO handle error
    });
}

export default combineEpics(createGameEpic, enterLobbyEpic);

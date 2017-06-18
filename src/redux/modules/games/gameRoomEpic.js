/* @flow */
import { Observable } from 'rxjs';
import type { Store } from 'redux';
import type { State } from '../root';
import type { EnterSpectatorRoomAction } from './gameRoomActions';

import {
  ENTER_SPECTATOR,
  EXIT_SPECTATOR,
  JOIN_GAME,
  LEAVE_GAME,
} from './gameRoomActions';

import type DeepstreamClient from '../../deepstreamClient';

type Dependencies = {
  deepstreamClient: DeepstreamClient,
};

export default function gameRoomEpic(
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
          .flatMap(() => {
            // TODO handle events sent to spectator channel
            return [];
          })
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
  );
}

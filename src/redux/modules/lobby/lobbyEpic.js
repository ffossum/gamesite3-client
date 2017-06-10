/* @flow */
import { CREATE_GAME_REQUEST, gameCreated } from './lobbyActions';
import type { CreateGameRequestAction } from './lobbyActions';
import { Observable } from 'rxjs';

type Dependencies = {
  deepstreamClient: any,
};
export default function lobbyEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { deepstreamClient }: Dependencies
) {
  return action$
    .ofType(CREATE_GAME_REQUEST)
    .flatMap((action: CreateGameRequestAction) => {
      const uid = action.payload.userId;
      return Observable.fromPromise(
        deepstreamClient.make('create-game', { uid })
      )
        .map(game => {
          return gameCreated(game);
        })
        .catch(() => Observable.empty());
    });
}

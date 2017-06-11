/* @flow */
import type { Observable } from 'rxjs';
import { CREATE_GAME_REQUEST, ENTER_LOBBY, gameCreated } from './lobbyActions';
import type { CreateGameRequestAction } from './lobbyActions';
import { combineEpics } from 'redux-observable';
import type { Store } from 'redux';

type Dependencies = {
  deepstreamClient: any,
  history: any,
};
function enterLobbyEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient }: Dependencies,
) {
  return action$
    .filter(action => action.type === ENTER_LOBBY)
    .flatMap(() => deepstreamClient.subscribe('lobby'))
    .flatMap(data => {
      switch (data.t) {
        case 'create-game':
          return [gameCreated(data.p)];

        default:
          return [];
      }
    });
}

function createGameEpic(
  action$: Observable<*>,
  store: Store<*, *>,
  { deepstreamClient, history }: Dependencies,
) {
  return action$
    .filter(action => action.type === CREATE_GAME_REQUEST)
    .do((action: CreateGameRequestAction) => {
      const uid = action.payload.userId;
      deepstreamClient
        .make('create-game', { uid })
        .then(game => {
          history.push(`/game/${game.id}`);
        })
        .catch(() => {
          // TODO
        });
    })
    .ignoreElements();
}

export default combineEpics(createGameEpic, enterLobbyEpic);

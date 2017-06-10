/* @flow */
import { CREATE_GAME_REQUEST, ENTER_LOBBY, gameCreated } from './lobbyActions';
import type { CreateGameRequestAction } from './lobbyActions';
import { combineEpics } from 'redux-observable';

type Dependencies = {
  deepstreamClient: any,
};
function enterLobbyEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { deepstreamClient }: Dependencies
) {
  return action$
    .ofType(ENTER_LOBBY)
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
  action$: ActionsObservable<*>,
  store: Store<*>,
  { deepstreamClient }: Dependencies
) {
  return action$
    .ofType(CREATE_GAME_REQUEST)
    .do((action: CreateGameRequestAction) => {
      const uid = action.payload.userId;
      deepstreamClient.make('create-game', { uid });
    })
    .ignoreElements();
}

export default combineEpics(createGameEpic, enterLobbyEpic);

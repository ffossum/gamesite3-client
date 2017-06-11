/* @flow */
import { Observable } from 'rxjs';
import { stringify } from 'query-string';

import { fetchedUserData } from './userDataActions';
import { RECEIVE_MESSAGE } from '../chat/chatActions';
import { GAME_CREATED, REFRESH_LOBBY } from '../lobby/lobbyActions';

import type { ReceiveMessageAction } from '../chat/chatActions';
import type {
  GameCreatedAction,
  RefreshLobbyAction,
} from '../lobby/lobbyActions';
import type { Store } from 'redux';
import type { State } from '../root';
import { values, chain } from 'ramda';

type Dependencies = {
  ajax: {
    getJSON: string => Observable<*>,
  },
};
export default function userDataEpic(
  action$: Observable<*>,
  store: Store<State, *>,
  { ajax }: Dependencies,
) {
  return Observable.merge(
    action$
      .filter(action => action.type === RECEIVE_MESSAGE)
      .map((action: ReceiveMessageAction) => action.payload.msg.uid),
    action$
      .filter(action => action.type === GAME_CREATED)
      .map((action: GameCreatedAction) => action.payload.host),
    action$
      .filter(action => action.type === REFRESH_LOBBY)
      .flatMap((action: RefreshLobbyAction) => {
        const games = values(action.payload);
        const userIds = chain(game => [game.host, ...game.players], games);
        return userIds;
      }),
  )
    .distinct()
    .filter(userId => !store.getState().users[userId])
    .bufferTime(100)
    .filter(userIds => userIds.length > 0)
    .flatMap(userId => {
      const queryString = stringify({
        id: [userId],
      });
      return ajax.getJSON(`/api/users?${queryString}`);
    })
    .map(users => fetchedUserData(users));
}

/* @flow */
import type { Observable } from 'rxjs';
import { stringify } from 'query-string';

import { fetchedUserData } from './userDataActions';
import { RECEIVE_MESSAGE } from '../chat/chatActions';
import { GAME_CREATED } from '../lobby/lobbyActions';

import type { ReceiveMessageAction } from '../chat/chatActions';
import type { GameCreatedAction } from '../lobby/lobbyActions';
import type { Store } from 'redux';
import type { State } from '../root';

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
  return action$
    .filter(action => action.type === RECEIVE_MESSAGE)
    .map((action: ReceiveMessageAction) => action.payload.msg.uid)
    .merge(
      action$
        .filter(action => action.type === GAME_CREATED)
        .map((action: GameCreatedAction) => action.payload.host),
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

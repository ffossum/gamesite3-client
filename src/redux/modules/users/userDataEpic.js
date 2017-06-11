/* @flow */
import type { Observable } from 'rxjs';
import { stringify } from 'query-string';

import { fetchedUserData } from './userDataActions';
import { RECEIVE_MESSAGE } from '../chat/chatActions';
import type { ReceiveMessageAction } from '../chat/chatActions';

type Dependencies = {
  ajax: any,
};
export default function userDataEpic(
  action$: Observable<*>,
  store: Store<*>,
  { ajax }: Dependencies
) {
  return action$
    .filter(action => action.type === RECEIVE_MESSAGE)
    .map((action: ReceiveMessageAction) => action.payload.msg.uid)
    .distinct()
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

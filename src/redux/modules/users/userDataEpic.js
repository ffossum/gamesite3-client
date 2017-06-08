/* @flow */
import { stringify } from 'query-string';
import { fetchedUserData } from './userDataActions';
import { RECEIVE_MESSAGE } from '../chat/chatActions';
import type { ReceiveMessageAction } from '../chat/chatActions';

type Dependencies = {
  ajax: any,
};
export default function userDataEpic(
  action$: ActionsObservable<*>,
  store: Store<*>,
  { ajax }: Dependencies
) {
  return action$
    .ofType(RECEIVE_MESSAGE)
    .map((action: ReceiveMessageAction) => action.payload.msg.uid)
    .distinct()
    .bufferTime(100)
    .filter(userIds => userIds.length)
    .flatMap(userId => {
      const queryString = stringify({
        id: [userId],
      });
      return ajax.getJSON(`/api/users?${queryString}`);
    })
    .map(users => fetchedUserData(users));
}

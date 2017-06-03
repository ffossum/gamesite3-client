/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

import userDataEpic from './userDataEpic';
import { receiveMessage } from '../chat/chatActions';
import { fetchedUserData } from './userDataActions';

describe('user data epic', () => {
  test('fetches user data when a message is received', async () => {
    const action = receiveMessage({
      ch: 'channel name',
      uid: 'user-id',
      txt: 'message text',
    });

    const ajax = {
      getJSON: jest.fn(),
    };
    ajax.getJSON.mockReturnValueOnce(
      Observable.of([
        {
          id: 'user-id',
          username: 'Username',
        },
      ])
    );

    const action$ = ActionsObservable.of(action);

    await new Promise(resolve => {
      userDataEpic(action$, null, { ajax }).toArray().subscribe(actions => {
        expect(ajax.getJSON).toHaveBeenCalledWith('/api/users?id=user-id');
        expect(actions).toHaveLength(1);
        expect(actions[0]).toEqual(
          fetchedUserData([
            {
              id: 'user-id',
              username: 'Username',
            },
          ])
        );
        resolve();
      });
    });
  });
});
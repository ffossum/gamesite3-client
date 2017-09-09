/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';

import userDataEpic from './userDataEpic';
import { receiveMessage } from '../chat/chatActions';
import { gameCreated } from '../lobby/lobbyActions';
import { fetchedUserData } from './userDataActions';
import { createStore } from 'redux';
import { rootReducer } from '../root';

describe('user data epic', () => {
  let ajax;
  let store;
  beforeEach(() => {
    ajax = {
      getJSON: jest.fn(),
    };
    ajax.getJSON.mockReturnValueOnce(
      Observable.of([
        {
          id: 'user-id',
          username: 'Username',
        },
      ]),
    );
    store = createStore(rootReducer);
  });
  test('fetches host user data when a new game is created', async () => {
    const action = gameCreated({
      id: 'game-id',
      host: 'user-id',
      createdTime: '2017-06-08T01:49:25.779Z',
      players: [],
    });
    const action$ = Observable.of(action);

    const resultActions = await userDataEpic(action$, store, { ajax })
      .toArray()
      .toPromise();

    expect(ajax.getJSON).toHaveBeenCalledWith('/api/users?id=user-id');
    expect(resultActions).toHaveLength(1);
    expect(resultActions[0]).toEqual(
      fetchedUserData([
        {
          id: 'user-id',
          username: 'Username',
        },
      ]),
    );
  });
  test('fetches user data when a message is received', async () => {
    const action = receiveMessage(
      {
        ch: 'channel name',
        uid: 'user-id',
        txt: 'message text',
      },
      '2017-06-08T01:49:25.779Z',
    );

    const action$ = Observable.of(action);

    const resultActions = await userDataEpic(action$, store, { ajax })
      .toArray()
      .toPromise();

    expect(ajax.getJSON).toHaveBeenCalledWith('/api/users?id=user-id');
    expect(resultActions).toHaveLength(1);
    expect(resultActions[0]).toEqual(
      fetchedUserData([
        {
          id: 'user-id',
          username: 'Username',
        },
      ]),
    );
  });
  test('does not refetch already fetched user data', async () => {
    store.dispatch(
      fetchedUserData([
        {
          id: 'user-id',
          username: 'Username',
        },
      ]),
    );

    const action = receiveMessage(
      {
        ch: 'channel name',
        uid: 'user-id',
        txt: 'message text',
      },
      '2017-06-08T01:49:25.779Z',
    );

    const action$ = Observable.of(action);

    await userDataEpic(action$, store, { ajax })
      .toArray()
      .toPromise();

    expect(ajax.getJSON).not.toHaveBeenCalled();
  });
});

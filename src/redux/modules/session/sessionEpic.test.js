/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import { authenticatedUser } from './sessionActions';
import sessionEpic from './sessionEpic';
import { playerJoined, playerLeft } from '../games/gameRoomActions';

describe('session epic', () => {
  let store: any;
  let deepstreamClient: any;

  beforeEach(() => {
    deepstreamClient = {
      subscribe: jest.fn(),
    };
  });

  test('authenticated user subscribes to user events', async () => {
    deepstreamClient.subscribe.mockReturnValue(Observable.empty());

    const userData = {
      email: 'bob@test.com',
      id: 'user_id',
      username: 'Bob',
    };

    const action = authenticatedUser(userData);
    const action$ = Observable.of(action);

    await sessionEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);
    expect(deepstreamClient.subscribe).toHaveBeenCalledWith('user:user_id');
  });

  test('handles events from subscription', async () => {
    deepstreamClient.subscribe.mockReturnValue(
      Observable.of(
        {
          t: 'player-joined',
          p: {
            gid: 'game1',
            uid: 'user1',
          },
        },
        {
          t: 'player-left',
          p: {
            gid: 'game1',
            uid: 'user1',
          },
        },
      ),
    );

    const userData = {
      email: 'bob@test.com',
      id: 'user_id',
      username: 'Bob',
    };

    const action = authenticatedUser(userData);
    const action$ = Observable.of(action);

    const resultActions = await sessionEpic(action$, store, {
      deepstreamClient,
    })
      .toArray()
      .toPromise();

    expect(resultActions).toEqual([
      playerJoined('user1', 'game1'),
      playerLeft('user1', 'game1'),
    ]);
  });
});

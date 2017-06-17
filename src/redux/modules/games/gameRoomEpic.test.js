/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import gameRoomEpic from './gameRoomEpic';
import { enterRoom, exitRoom } from './gameRoomActions';
import { joinChannel, leaveChannel } from '../chat/chatActions';

describe('game room epic', () => {
  test('join chat when entering room', async () => {
    const action$ = Observable.of(enterRoom('game-id'));

    const resultActions = await gameRoomEpic(action$).toArray().toPromise();

    expect(resultActions).toEqual([joinChannel('game:game-id')]);
  });

  test('leave chat when exiting room', async () => {
    const action$ = Observable.of(exitRoom('game-id'));

    const resultActions = await gameRoomEpic(action$).toArray().toPromise();

    expect(resultActions).toEqual([leaveChannel('game:game-id')]);
  });
});

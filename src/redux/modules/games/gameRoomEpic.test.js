/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import gameRoomEpic from './gameRoomEpic';
import { joinGame, leaveGame } from './gameRoomActions';

describe('game room epic', () => {
  let store: any;
  let deepstreamClient: any;

  beforeEach(() => {
    deepstreamClient = {
      make: jest.fn(),
    };
  });

  test('makes rpc join game request', async () => {
    const action = joinGame('user_id', 'game_id');
    const action$ = Observable.of(action);
    await gameRoomEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.make).toHaveBeenCalledWith(
      'join-game',
      action.payload,
    );
  });

  test('makes rpc leave game request', async () => {
    const action = leaveGame('user_id', 'game_id');
    const action$ = Observable.of(action);
    await gameRoomEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.make).toHaveBeenCalledWith(
      'leave-game',
      action.payload,
    );
  });
});

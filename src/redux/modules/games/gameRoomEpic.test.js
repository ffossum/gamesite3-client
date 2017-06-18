/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import gameRoomEpic from './gameRoomEpic';
import {
  joinGame,
  leaveGame,
  enterSpectatorRoom,
  exitSpectatorRoom,
} from './gameRoomActions';

describe('game room epic', () => {
  let store: any;
  let deepstreamClient: any;

  beforeEach(() => {
    deepstreamClient = {
      make: jest.fn(),
      subscribe: jest.fn(),
    };
  });

  test('subscribes to spectator events when entering spectator room', async () => {
    const action = enterSpectatorRoom('game_id');
    const action$ = Observable.of(action);

    deepstreamClient.subscribe.mockReturnValue(Observable.empty());

    await gameRoomEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);
    expect(deepstreamClient.subscribe).toHaveBeenCalledWith('spectate:game_id');
  });

  test('unsubscribes from spectator events when exiting spectator room', async () => {
    const action$ = Observable.of(
      enterSpectatorRoom('game_id'),
      exitSpectatorRoom('game_id'),
    );

    deepstreamClient.subscribe.mockReturnValue(Observable.never());
    await gameRoomEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();
    // Pass = No timeout
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

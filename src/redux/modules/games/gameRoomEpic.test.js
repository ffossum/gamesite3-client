/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import gameRoomEpic from './gameRoomEpic';
import {
  joinGame,
  leaveGame,
  enterRoom,
  enterSpectatorRoom,
  exitSpectatorRoom,
} from './gameRoomActions';
import { fetchGameDataRequest, fetchGameDataSuccess } from './gameDataActions';
import type { GameDataState } from './gamesReducer';

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

  test('fetches game data if needed when entering room', async () => {
    const shouldFetchGameData = true;
    const action = enterRoom('game_id', shouldFetchGameData);
    const action$ = Observable.of(action);

    const resultActions = await gameRoomEpic(action$, store, {
      deepstreamClient,
    })
      .toArray()
      .toPromise();

    expect(resultActions).toContainEqual(fetchGameDataRequest('game_id'));
  });

  test('does not fetch game data if not needed when entering room', async () => {
    const shouldFetchGameData = false;
    const action = enterRoom('game_id', shouldFetchGameData);
    const action$ = Observable.of(action);

    const resultActions = await gameRoomEpic(action$, store, {
      deepstreamClient,
    })
      .toArray()
      .toPromise();

    expect(resultActions).not.toContainEqual(fetchGameDataRequest('game_id'));
  });

  test('fetch game request action performs ajax call', async () => {
    const action = fetchGameDataRequest('game_id');
    const action$ = Observable.of(action);

    const mockGame: GameDataState = {
      createdTime: '2017-06-24T19:03:37.996Z',
      host: 'user_id',
      players: ['user_id'],
      id: 'game_id',
    };

    const ajax = {
      getJSON: jest.fn(),
    };
    ajax.getJSON.mockReturnValue(Observable.of(mockGame));

    const resultActions = await gameRoomEpic(action$, store, { ajax })
      .toArray()
      .toPromise();

    expect(resultActions).toContainEqual(fetchGameDataSuccess(mockGame));
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

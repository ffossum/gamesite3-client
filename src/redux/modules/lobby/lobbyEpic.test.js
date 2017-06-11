/* @flow */
/* eslint-env jest */
import lobbyEpic from './lobbyEpic';
import { enterLobby, gameCreated, createGameRequest } from './lobbyActions';
import { Observable } from 'rxjs';

describe('lobby epic', () => {
  let store;
  let deepstreamClient;
  beforeEach(() => {
    deepstreamClient = {
      subscribe: jest.fn(),
      make: jest.fn(),
    };
  });

  test('subscribes to lobby events when entering lobby', async () => {
    deepstreamClient.subscribe.mockReturnValue([]);

    const action = enterLobby();
    const action$ = Observable.of(action);
    await lobbyEpic(action$, store, { deepstreamClient }).toArray().toPromise();

    expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);
    expect(deepstreamClient.subscribe).toHaveBeenCalledWith('lobby');
  });

  test('handles game created events after subscribing', async () => {
    const gameData = {
      id: 'game-id',
      host: 'user-id',
      createdTime: '2017-06-11T15:47:15.613Z',
    };
    const event = {
      t: 'create-game',
      p: gameData,
    };
    deepstreamClient.subscribe.mockReturnValue(Observable.of(event));

    const action = enterLobby();
    const action$ = Observable.of(action);
    const resultActions = await lobbyEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(resultActions).toHaveLength(1);
    expect(resultActions).toContainEqual(gameCreated(gameData));
  });

  test('makes deepstream rpc request to create game', async () => {
    const history = {
      push: jest.fn(),
    };
    deepstreamClient.make.mockReturnValue(Promise.resolve({ id: 'game-id' }));

    const action = createGameRequest('user-id');
    const action$ = Observable.of(action);

    await lobbyEpic(action$, store, { deepstreamClient, history })
      .toArray()
      .toPromise();

    expect(deepstreamClient.make).toHaveBeenCalledTimes(1);
    expect(deepstreamClient.make).toHaveBeenCalledWith('create-game', {
      uid: 'user-id',
    });
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/game/game-id');
  });
});

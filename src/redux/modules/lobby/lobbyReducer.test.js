/* @flow */
/* eslint-env jest */
import lobbyReducer from './lobbyReducer';
import { refreshLobby, gameCreated } from './lobbyActions';

describe('lobby reducer', () => {
  test('initial state', () => {
    const initialState = lobbyReducer(undefined, { type: '@@INIT' });
    expect(initialState).toMatchSnapshot();
  });

  test('refresh lobby action completely replaces game list', () => {
    const initialState = {
      games: ['game0'],
    };

    const action = refreshLobby({
      game1: {
        id: 'game1',
        createdTime: '2017-06-19T20:33:46.834Z',
        host: 'user1',
        players: ['user1', 'user2'],
      },
      game2: {
        id: 'game2',
        createdTime: '2017-06-19T20:34:44.520Z',
        host: 'user2',
        players: ['user2', 'user3'],
      },
    });

    const state = lobbyReducer(initialState, action);

    expect(state.games).toHaveLength(2);
    expect(state.games).toContainEqual('game1');
    expect(state.games).toContainEqual('game2');
  });

  test('create game action adds game id to list', () => {
    const initialState = {
      games: ['game0'],
    };

    const action = gameCreated({
      id: 'game1',
      createdTime: '2017-06-19T20:33:46.834Z',
      host: 'user1',
      players: ['user1', 'user2'],
    });

    const state = lobbyReducer(initialState, action);
    expect(state.games).toHaveLength(2);
    expect(state.games).toContainEqual('game0');
    expect(state.games).toContainEqual('game1');
  });
});

/* @flow */
/* eslint-env jest */
import { gameCreated, gameUpdated } from '../lobby/lobbyActions';
import { playerJoined } from '../games/gameRoomActions';
import gamesReducer from './gamesReducer';

describe('games reducer', () => {
  const initialState = gamesReducer(undefined, { type: '@@INIT' });

  test('adds new created game to games', () => {
    const action = gameCreated({
      createdTime: '2017-06-11T10:57:22.414Z',
      id: 'gameid-1',
      host: 'asdf-id',
      players: ['asdf-id'],
    });
    const state = gamesReducer(initialState, action);

    expect(state).toEqual({
      'gameid-1': {
        createdTime: '2017-06-11T10:57:22.414Z',
        id: 'gameid-1',
        host: 'asdf-id',
        players: ['asdf-id'],
      },
    });
  });

  test('updates game data', () => {
    const action = gameCreated({
      createdTime: '2017-06-11T10:57:22.414Z',
      id: 'gameid-1',
      host: 'asdf-id',
      players: ['asdf-id'],
    });

    let state = gamesReducer(initialState, action);

    const updateAction = gameUpdated({
      id: 'gameid-1',
      players: ['asdf-id', 'zxcv-id'],
    });

    state = gamesReducer(state, updateAction);

    expect(state).toEqual({
      'gameid-1': {
        createdTime: '2017-06-11T10:57:22.414Z',
        id: 'gameid-1',
        host: 'asdf-id',
        players: ['asdf-id', 'zxcv-id'],
      },
    });
  });

  test('adds joined player to game data', () => {
    const action = gameCreated({
      createdTime: '2017-06-11T10:57:22.414Z',
      id: 'gameid_1',
      host: 'asdf-id',
      players: ['asdf-id'],
    });

    let state = gamesReducer(initialState, action);
    const joinAction = playerJoined('qwer-id', 'gameid_1');

    state = gamesReducer(state, joinAction);

    expect(state.gameid_1 && state.gameid_1.players).toContainEqual('qwer-id');
  });
});

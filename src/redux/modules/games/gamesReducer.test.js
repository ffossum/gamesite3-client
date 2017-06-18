/* @flow */
/* eslint-env jest */
import { gameCreated, gameUpdated } from '../lobby/lobbyActions';
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
});

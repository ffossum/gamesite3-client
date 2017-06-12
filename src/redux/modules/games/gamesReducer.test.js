/* @flow */
/* eslint-env jest */
import { gameCreated } from '../lobby/lobbyActions';
import gamesReducer from './gamesReducer';

describe('games reducer', () => {
  const initialState = gamesReducer(undefined, { type: '@@INIT' });

  test('adds new created game to games', () => {
    const action = gameCreated({
      createdTime: '2017-06-11T10:57:22.414Z',
      id: 'gameid-1',
      host: 'asdf-id',
      players: [],
    });
    const state = gamesReducer(initialState, action);

    expect(state).toEqual({
      'gameid-1': {
        createdTime: '2017-06-11T10:57:22.414Z',
        id: 'gameid-1',
        host: 'asdf-id',
        players: [],
      },
    });
  });
});

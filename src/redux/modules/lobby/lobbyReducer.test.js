/* @flow */
/* eslint-env jest */
import { gameCreated } from './lobbyActions';
import lobbyReducer from './lobbyReducer';

describe('lobby reducer', () => {
  const initialState = lobbyReducer(undefined, { type: '@@INIT' });

  test('adds new created game to lobby', () => {
    const action = gameCreated({
      createdTime: '2017-06-11T10:57:22.414Z',
      id: 'gameid-1',
      host: 'asdf-id',
    });
    const state = lobbyReducer(initialState, action);

    expect(state).toEqual({
      'gameid-1': {
        createdTime: '2017-06-11T10:57:22.414Z',
        id: 'gameid-1',
        host: 'asdf-id',
      },
    });
  });
});

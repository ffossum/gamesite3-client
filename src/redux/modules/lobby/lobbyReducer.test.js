/* @flow */
/* eslint-env jest */
import { gameCreated } from './lobbyActions';
import lobbyReducer from './lobbyReducer';

describe('lobby reducer', () => {
  const initialState = lobbyReducer(undefined, { type: '@@INIT' });

  test('adds new created game to lobby', () => {
    const action = gameCreated({ id: 'gameid-1' });
    const state = lobbyReducer(initialState, action);

    expect(state).toEqual({
      'gameid-1': {
        id: 'gameid-1',
      },
    });
  });
});

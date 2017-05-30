/* @flow */
/* eslint-env jest */
import chatReducer from './chatReducer';
import { receiveMessage } from './chatActions';

describe('chat reducer', () => {
  const initialState = chatReducer(undefined, { type: '@@INIT' });

  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  test('adds received message to channel', () => {
    const action = receiveMessage('mainchat', { uid: 'userid', txt: 'hello' });
    const state = chatReducer(initialState, action);

    expect(state.mainchat && state.mainchat.messages).toHaveLength(1);
    expect(state.mainchat && state.mainchat.messages[0]).toEqual({
      uid: 'userid',
      txt: 'hello',
    });
  });
});

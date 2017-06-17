/* @flow */
/* eslint-env jest */
import chatReducer from './chatReducer';
import { receiveMessage, leaveChannel } from './chatActions';

describe('chat reducer', () => {
  const initialState = chatReducer(undefined, { type: '@@INIT' });

  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  test('adds received message to channel', () => {
    const action = receiveMessage(
      {
        ch: 'mainchat',
        uid: 'userid',
        txt: 'hello',
      },
      '2017-06-08T01:49:25.779Z',
    );
    const state = chatReducer(initialState, action);

    expect(state.mainchat && state.mainchat.messages).toHaveLength(1);
    expect(state.mainchat && state.mainchat.messages[0]).toEqual({
      userId: 'userid',
      text: 'hello',
      time: '2017-06-08T01:49:25.779Z',
    });
  });

  test('removes all channel data when leaving channel', () => {
    const addMessageAction = receiveMessage(
      {
        ch: 'mainchat',
        uid: 'userid',
        txt: 'hello',
      },
      '2017-06-08T01:49:25.779Z',
    );
    let state = chatReducer(initialState, addMessageAction);

    expect(state).toHaveProperty('mainchat');
    const leaveChannelAction = leaveChannel('mainchat');

    state = chatReducer(state, leaveChannelAction);
    expect(state).not.toHaveProperty('mainchat');
  });
});

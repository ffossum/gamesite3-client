/* @flow */
/* eslint-env jest */
import reducer from './sessionReducer';
import { authenticatedUser } from './sessionActions';

describe('session reducer', () => {
  const initialState = reducer(undefined, { type: '@@INIT' });
  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });
  test('contains user data after user is authenticated', () => {
    const action = authenticatedUser({
      username: 'bob',
      id: 'userid',
    });

    const state = reducer(initialState, action);
    expect(state).toEqual({
      user: {
        username: 'bob',
        id: 'userid',
      },
    });
  });
});

/* @flow */
/* eslint-env jest */
import reducer from './loginReducer';
import { loginRequest, loginSuccess, loginFailure } from './loginActions';

describe('login reducer', () => {
  const login = {
    email: 'bob@test.com',
    password: 'bobisthebest',
  };
  const initialState = reducer(undefined, { type: '@@INIT' });
  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  test('is loading after request', () => {
    const action = loginRequest(login);
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('is no longer loading after success', () => {
    let state = reducer(initialState, loginRequest(login));
    state = reducer(
      state,
      loginSuccess({
        email: 'bob@test.com',
        id: 'abc123',
        username: 'bob',
      }),
    );
    expect(state.loading).toBe(false);
  });

  test('is no longer loading after failure', () => {
    let state = reducer(initialState, loginRequest(login));
    state = reducer(state, loginFailure());
    expect(state.loading).toBe(false);
  });
});

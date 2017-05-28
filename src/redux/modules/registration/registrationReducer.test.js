/* @flow */
/* eslint-env jest */
import reducer from './registrationReducer';
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
} from './registrationActions';

describe('registration reducer', () => {
  const registration = {
    username: 'bob',
    email: 'bob@test.com',
    password: 'bobisthebest',
    repeatPassword: 'bobisthebest',
  };
  const initialState = reducer(undefined, { type: '@@INIT' });
  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });

  test('is loading after request', () => {
    const action = registrationRequest(registration);
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('is no longer loading after success', () => {
    let state = reducer(initialState, registrationRequest(registration));
    state = reducer(
      state,
      registrationSuccess({
        id: 'abc123',
        username: 'bob',
      })
    );
    expect(state.loading).toBe(false);
  });

  test('is no longer loading after failure', () => {
    let state = reducer(initialState, registrationRequest(registration));
    state = reducer(state, registrationFailure());
    expect(state.loading).toBe(false);
  });
});

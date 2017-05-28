/* @flow */
/* eslint-env jest */
import reducer from './sessionReducer';
import { registrationSuccess } from '../registration/registrationActions';

describe('session reducer', () => {
  const initialState = reducer(undefined, { type: '@@INIT' });
  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });
  test('contains user data after successful registration', () => {
    const action = registrationSuccess({
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

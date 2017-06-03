/* @flow */
/* eslint-env jest */
import usersReducer from './usersReducer';
import { fetchedUserData } from './userDataActions';

describe('users reducer', () => {
  const initialState = usersReducer(undefined, { type: '@@INIT' });
  test('initial state', () => {
    expect(initialState).toMatchSnapshot();
  });
  test('fetched users are added to state', () => {
    const action = fetchedUserData([
      {
        id: 'asdf-id',
        username: 'asdf',
      },
      {
        id: 'zxcv-id',
        username: 'zxcv',
      },
    ]);
    const state = usersReducer(initialState, action);
    expect(state).toEqual({
      'asdf-id': {
        id: 'asdf-id',
        username: 'asdf',
      },
      'zxcv-id': {
        id: 'zxcv-id',
        username: 'zxcv',
      },
    });
  });
});

/* @flow */
import type { Action } from '../../actions';
import { FETCHED_USER_DATA } from './userDataActions';

export type UsersState = {
  [string]: PublicUserData,
};

const initialState = {};

export default function usersReducer(
  state: UsersState = initialState,
  action: Action
) {
  switch (action.type) {
    case FETCHED_USER_DATA: {
      const newUsers = {};
      action.payload.forEach(user => {
        newUsers[user.id] = user;
      });

      return {
        ...state,
        ...newUsers,
      };
    }
    default:
      return state;
  }
}
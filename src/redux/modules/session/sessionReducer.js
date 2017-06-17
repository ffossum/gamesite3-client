/* @flow */
import type { Action } from '../../actions';
import { AUTHENTICATED_USER } from './sessionActions';

export type SessionUser = {
  id: string,
  username: string,
};
export type SessionState = {
  user: ?SessionUser,
};
const initialState: SessionState = {
  user: null,
};

export default function sessionReducer(
  state: SessionState = initialState,
  action: Action,
) {
  switch (action.type) {
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

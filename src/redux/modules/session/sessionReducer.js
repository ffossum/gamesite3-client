/* @flow */
import type { Action } from '../../actions';
import { REGISTRATION_SUCCESS } from '../registration/registrationActions';

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
  action: Action
) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

/* @flow */
import type { Action } from '../../actions';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './loginActions';

export type LoginState = {
  loading: boolean,
};
const initialState = {
  loading: false,
};
export default function reducer(
  state?: LoginState = initialState,
  action: Action,
) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOGIN_SUCCESS:
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

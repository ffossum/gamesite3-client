/* @flow */
export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';

import type { SessionUser } from '../session/sessionReducer';

export type Login = {
  email: string,
  password: string,
};
export type LoginRequestAction = {
  type: typeof LOGIN_REQUEST,
  payload: Login,
};
export function loginRequest(login: Login): LoginRequestAction {
  return {
    type: LOGIN_REQUEST,
    payload: login,
  };
}

type LoginSuccessAction = {
  type: typeof LOGIN_SUCCESS,
  payload: SessionUser,
};
export function loginSuccess(user: SessionUser): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

type LoginFailureAction = {
  type: typeof LOGIN_FAILURE,
};
export function loginFailure(): LoginFailureAction {
  return {
    type: LOGIN_FAILURE,
  };
}

export type LoginAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;

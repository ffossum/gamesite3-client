/* @flow */
export const REGISTRATION_REQUEST = 'registration/request';
export const REGISTRATION_SUCCESS = 'registration/success';
export const REGISTRATION_FAILURE = 'registration/failure';

import type { SessionUser } from '../session/sessionReducer';

export type Registration = {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
};
export type RegistrationRequestAction = {
  type: typeof REGISTRATION_REQUEST,
  payload: Registration,
};
export function registrationRequest(
  registration: Registration,
): RegistrationRequestAction {
  return {
    type: REGISTRATION_REQUEST,
    payload: registration,
  };
}

type RegistrationSuccessAction = {
  type: typeof REGISTRATION_SUCCESS,
  payload: SessionUser,
};
export function registrationSuccess(
  user: SessionUser,
): RegistrationSuccessAction {
  return {
    type: REGISTRATION_SUCCESS,
    payload: user,
  };
}

type RegistrationFailureAction = {
  type: typeof REGISTRATION_FAILURE,
};
export function registrationFailure(): RegistrationFailureAction {
  return {
    type: REGISTRATION_FAILURE,
  };
}

export type RegistrationAction =
  | RegistrationRequestAction
  | RegistrationSuccessAction
  | RegistrationFailureAction;

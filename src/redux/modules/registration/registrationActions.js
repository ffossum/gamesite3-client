/* @flow */
export const REGISTRATION_REQUEST = 'registration/request';
export const REGISTRATION_SUCCESS = 'registration/success';
export const REGISTRATION_FAILURE = 'registration/failure';

export type Registration = {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
};
export type RegistrationRequestAction = {
  type: 'registration/request',
  payload: Registration,
};
export function registrationRequest(
  registration: Registration
): RegistrationRequestAction {
  return {
    type: REGISTRATION_REQUEST,
    payload: registration,
  };
}

type RegistrationSuccessAction = {
  type: 'registration/success',
};
export function registrationSuccess(): RegistrationSuccessAction {
  return {
    type: REGISTRATION_SUCCESS,
  };
}

type RegistrationFailureAction = {
  type: 'registration/failure',
  payload: Registration,
};
export function registrationFailure(
  registration: Registration
): RegistrationFailureAction {
  return {
    type: REGISTRATION_FAILURE,
    payload: registration,
  };
}

export type RegistrationAction =
  | RegistrationRequestAction
  | RegistrationSuccessAction
  | RegistrationFailureAction;

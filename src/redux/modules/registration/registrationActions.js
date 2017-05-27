/* @flow */
const REGISTRATION_REQUEST = 'registration/request';
const REGISTRATION_SUCCESS = 'registration/success';
const REGISTRATION_FAILURE = 'registration/failure';

export type Registration = {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
};
type RegistrationRequestAction = {
  type: 'registration/request',
  payload: Registration,
};
function registrationRequest(
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

export function register(registration: Registration) {
  return (dispatch: Dispatch<*>) => {
    dispatch(registrationRequest(registration));

    fetch('/api/registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(registration),
    }).then(response => {
      if (response.ok) {
        dispatch(registrationSuccess());
      } else {
        dispatch(registrationFailure(registration));
      }
    });
  };
}

export type RegistrationAction =
  | RegistrationRequestAction
  | RegistrationSuccessAction
  | RegistrationFailureAction;

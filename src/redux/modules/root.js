/* @flow */
import registrationReducer from './registration/registrationReducer';
import type { RegistrationState } from './registration/registrationReducer';

export type State = RegistrationState;

export const rootReducer = registrationReducer;

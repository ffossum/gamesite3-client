/* @flow */
import registrationReducer from './registration/registrationReducer';
import type { RegistrationState } from './registration/registrationReducer';
import registrationEpic from './registration/registrationEpic';

export type State = RegistrationState;

export const rootReducer = registrationReducer;
export const rootEpic = registrationEpic;

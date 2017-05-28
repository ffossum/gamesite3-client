/* @flow */
import { combineReducers } from 'redux';
import registration from './registration/registrationReducer';
import type { RegistrationState } from './registration/registrationReducer';
import registrationEpic from './registration/registrationEpic';

export type State = {
  registration: RegistrationState,
};

export const rootReducer = combineReducers({
  registration,
});
export const rootEpic = registrationEpic;

/* @flow */
import { combineReducers } from 'redux';
import registration from './registration/registrationReducer';
import type { RegistrationState } from './registration/registrationReducer';
import registrationEpic from './registration/registrationEpic';
import session from './session/sessionReducer';
import type { SessionState } from './session/sessionReducer';

export type State = {
  registration: RegistrationState,
  session: SessionState,
};

export const rootReducer = combineReducers({
  registration,
  session,
});
export const rootEpic = registrationEpic;

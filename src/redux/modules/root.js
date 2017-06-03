/* @flow */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import registration from './registration/registrationReducer';
import type { RegistrationState } from './registration/registrationReducer';
import registrationEpic from './registration/registrationEpic';
import session from './session/sessionReducer';
import type { SessionState } from './session/sessionReducer';

import login from './login/loginReducer';
import type { LoginState } from './login/loginReducer';
import loginEpic from './login/loginEpic';

import chat from './chat/chatReducer';
import type { ChatState } from './chat/chatReducer';
import chatEpic from './chat/chatEpic';

export type State = {
  chat: ChatState,
  login: LoginState,
  registration: RegistrationState,
  session: SessionState,
};

export const rootReducer = combineReducers({
  chat,
  login,
  registration,
  session,
});
export const rootEpic = combineEpics(chatEpic, registrationEpic, loginEpic);

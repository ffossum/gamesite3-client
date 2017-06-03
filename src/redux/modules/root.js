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

import users from './users/usersReducer';
import userDataEpic from './users/userDataEpic';
import type { UsersState } from './users/usersReducer';

export type State = {
  chat: ChatState,
  login: LoginState,
  registration: RegistrationState,
  session: SessionState,
  users: UsersState,
};

export const rootReducer = combineReducers({
  chat,
  login,
  registration,
  session,
  users,
});
export const rootEpic = combineEpics(
  chatEpic,
  registrationEpic,
  loginEpic,
  userDataEpic
);

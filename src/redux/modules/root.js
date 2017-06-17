/* @flow */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import registration from './registration/registrationReducer';
import type { RegistrationState } from './registration/registrationReducer';
import registrationEpic from './registration/registrationEpic';
import session from './session/sessionReducer';
import type { SessionState } from './session/sessionReducer';
import sessionEpic from './session/sessionEpic';

import login from './login/loginReducer';
import type { LoginState } from './login/loginReducer';
import loginEpic from './login/loginEpic';

import chat from './chat/chatReducer';
import type { ChatState } from './chat/chatReducer';
import chatEpic from './chat/chatEpic';

import users from './users/usersReducer';
import userDataEpic from './users/userDataEpic';
import type { UsersState } from './users/usersReducer';

import lobby from './lobby/lobbyReducer';
import lobbyEpic from './lobby/lobbyEpic';
import type { LobbyState } from './lobby/lobbyReducer';

import games from './games/gamesReducer';
import type { GamesState } from './games/gamesReducer';
import gameRoomEpic from './games/gameRoomEpic';

export type State = {
  chat: ChatState,
  login: LoginState,
  registration: RegistrationState,
  session: SessionState,
  users: UsersState,
  lobby: LobbyState,
  games: GamesState,
};

export const rootReducer = combineReducers({
  chat,
  login,
  registration,
  session,
  users,
  lobby,
  games,
});

export const rootEpic = combineEpics(
  chatEpic,
  loginEpic,
  registrationEpic,
  sessionEpic,
  userDataEpic,
  lobbyEpic,
  gameRoomEpic,
);

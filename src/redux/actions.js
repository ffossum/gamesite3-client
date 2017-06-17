/* @flow */
import type { RegistrationAction } from './modules/registration/registrationActions';
import type { LoginAction } from './modules/login/loginActions';
import type { ChatAction } from './modules/chat/chatActions';
import type { UserDataAction } from './modules/users/userDataActions';
import type { LobbyAction } from './modules/lobby/lobbyActions';
import type { GameRoomAction } from './modules/games/gameRoomActions';

export type Action =
  | ChatAction
  | LoginAction
  | RegistrationAction
  | UserDataAction
  | LobbyAction
  | GameRoomAction
  | { type: '@@INIT' };

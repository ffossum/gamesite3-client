/* @flow */
import type { RegistrationAction } from './modules/registration/registrationActions';
import type { LoginAction } from './modules/login/loginActions';
import type { ChatAction } from './modules/chat/chatActions';
import type { UserDataAction } from './modules/users/userDataActions';

export type Action =
  | ChatAction
  | LoginAction
  | RegistrationAction
  | UserDataAction
  | { type: '@@INIT' };

/* @flow */
import type {
  RegistrationAction,
} from './modules/registration/registrationActions';
import type { LoginAction } from './modules/login/loginActions';
import type { ChatAction } from './modules/chat/chatActions';

export type Action =
  | ChatAction
  | RegistrationAction
  | LoginAction
  | { type: '@@INIT' };

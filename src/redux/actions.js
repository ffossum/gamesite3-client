/* @flow */
import type {
  RegistrationAction,
} from './modules/registration/registrationActions';
import type { LoginAction } from './modules/login/loginActions';

export type Action = RegistrationAction | LoginAction | { type: '@@INIT' };

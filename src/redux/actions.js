/* @flow */
import type {
  RegistrationAction,
} from './modules/registration/registrationActions';

export type Action = RegistrationAction | { type: '@@INIT' };

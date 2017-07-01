/* @flow */
export const AUTHENTICATED_USER = 'user/authenticated';
import type { SessionUser } from './sessionReducer';

export type AuthenticatedUserAction = {
  type: 'user/authenticated',
  payload: SessionUser,
};
export function authenticatedUser(user: SessionUser) {
  return {
    type: AUTHENTICATED_USER,
    payload: user,
  };
}

export type SessionAction = AuthenticatedUserAction;

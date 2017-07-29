/* @flow */
export const AUTHENTICATED_USER = 'user/authenticated';
import type { SessionUser } from './sessionReducer';

export type AuthenticatedUserAction = {
  type: typeof AUTHENTICATED_USER,
  payload: SessionUser,
};
export function authenticatedUser(user: SessionUser) {
  return {
    type: AUTHENTICATED_USER,
    payload: user,
  };
}

export type SessionAction = AuthenticatedUserAction;

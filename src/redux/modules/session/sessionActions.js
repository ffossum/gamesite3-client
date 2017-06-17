/* @flow */
export const AUTHENTICATED_USER = 'user/authenticated';

export type AuthenticatedUserAction = {
  type: 'user/authenticated',
  payload: PublicUserData,
};
export function authenticatedUser(user: PublicUserData) {
  return {
    type: AUTHENTICATED_USER,
    payload: user,
  };
}

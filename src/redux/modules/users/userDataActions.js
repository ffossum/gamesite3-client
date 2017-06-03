/* @flow */
export const FETCHED_USER_DATA = 'data/fetched user(s)';

type FetchedUserDataAction = {
  type: 'data/fetched user(s)',
  payload: PublicUserData[],
};
export function fetchedUserData(
  users: PublicUserData[]
): FetchedUserDataAction {
  return {
    type: FETCHED_USER_DATA,
    payload: users,
  };
}

export type UserDataAction = FetchedUserDataAction;

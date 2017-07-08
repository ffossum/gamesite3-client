/* @flow */
declare var DEVELOPMENT: boolean;

declare module 'rxjs/observable/dom/ajax' {
  declare module.exports: any;
}

export type PublicUserData = {
  id: string,
  username: string,
};

export type PrivateUserData = PublicUserData & {
  email: string,
};

export type GameStatus = 'not_started' | 'in_progress' | 'canceled';

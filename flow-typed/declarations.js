/* @flow */

declare var DEVELOPMENT: boolean;

declare class ActionsObservable<T> extends rxjs$Observable<T> {
  ofType(string): ActionsObservable<T>;
}

declare module 'rxjs/observable/dom/ajax' {
  declare module.exports: any;
}


export type PublicUserData = {
  id: string,
  username: string,
}

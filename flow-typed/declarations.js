/* @flow */

declare var DEVELOPMENT: boolean;

declare class ActionsObservable<T> extends rxjs$Observable<T> {
  ofType(string): ActionsObservable<T>;
}

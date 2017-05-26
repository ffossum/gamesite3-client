/* @flow */
import type { Action } from '../actions/actionTypes';

export type State = {};
const initialState = {};
export default function reducer(state?: State = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

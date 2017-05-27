/* @flow */
import type { Action } from '../../actions';

export type RegistrationState = {};
const initialState = {};
export default function reducer(
  state?: RegistrationState = initialState,
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}

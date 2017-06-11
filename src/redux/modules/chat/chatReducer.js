/* @flow */
import type { Action } from '../../actions';
import type { ChannelState } from './channelReducer';
import type { ChannelName } from './chatActions';

import { RECEIVE_MESSAGE } from './chatActions';
import channelReducer from './channelReducer';

export type ChatState = {
  [ChannelName]: ChannelState,
};
const initialState: ChatState = {};

export default function chatReducer(
  state: ChatState = initialState,
  action: Action,
) {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      const { ch } = action.payload.msg;
      return {
        ...state,
        [ch]: channelReducer(state[ch], action),
      };
    }
    default:
      return state;
  }
}

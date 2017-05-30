/* @flow */
import { RECEIVE_MESSAGE } from './chatActions';
import type { Action } from '../../actions';
import type { UserMessage } from './chatActions';

export type ChannelState = {
  messages: UserMessage[],
};

const initialState: ChannelState = {
  messages: [],
};
export default function channelReducer(
  state: ChannelState = initialState,
  action: Action
): ChannelState {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      const { msg } = action.payload;
      return {
        ...state,
        messages: [...state.messages, msg],
      };
    }

    default:
      return state;
  }
}

/* @flow */
import { RECEIVE_MESSAGE } from './chatActions';
import type { Action } from '../../actions';

export type ChannelState = {
  messages: Array<{
    userId: string,
    text: string,
    time: string,
  }>,
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
      const message = {
        userId: action.payload.msg.uid,
        text: action.payload.msg.txt,
        time: action.payload.time,
      };

      return {
        ...state,
        messages: [...state.messages, message],
      };
    }

    default:
      return state;
  }
}

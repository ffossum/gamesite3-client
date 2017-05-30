/* @flow */
export const JOIN_CHANNEL = 'chat/join channel';
export const SEND_MESSAGE = 'chat/send message';
export const RECEIVE_MESSAGE = 'chat/receive message';

export type ChannelName = string;
export type UserMessage = {
  uid: string,
  txt: string,
};

type JoinChannelAction = {
  type: 'chat/join channel',
  payload: string,
};
export function joinChannel(channelName: ChannelName): JoinChannelAction {
  return {
    type: JOIN_CHANNEL,
    payload: channelName,
  };
}

type SendMessageAction = {
  type: 'chat/send message',
  payload: {
    ch: ChannelName,
    msg: UserMessage,
  },
};
export function sendMessage(
  ch: ChannelName,
  msg: UserMessage
): SendMessageAction {
  return {
    type: SEND_MESSAGE,
    payload: {
      ch,
      msg,
    },
  };
}

type ReceiveMessageAction = {
  type: 'chat/receive message',
  payload: {
    ch: ChannelName,
    msg: UserMessage,
  },
};
export function receiveMessage(
  ch: ChannelName,
  msg: UserMessage
): ReceiveMessageAction {
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      ch,
      msg,
    },
  };
}

export type ChatAction =
  | JoinChannelAction
  | SendMessageAction
  | ReceiveMessageAction;

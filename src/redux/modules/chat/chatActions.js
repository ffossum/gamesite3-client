/* @flow */
export const JOIN_CHANNEL = 'chat/join channel';
export const SEND_MESSAGE = 'chat/send message';
export const RECEIVE_MESSAGE = 'chat/receive message';

export type ChannelName = string;
export type UserMessage = {
  ch: ChannelName,
  txt: string,
  uid: string,
};

export type JoinChannelAction = {
  type: 'chat/join channel',
  payload: string,
};
export function joinChannel(channelName: ChannelName): JoinChannelAction {
  return {
    type: JOIN_CHANNEL,
    payload: channelName,
  };
}

export type SendMessageAction = {
  type: 'chat/send message',
  payload: UserMessage,
};
export function sendMessage(
  userId: string,
  channelName: string,
  messageText: string
): SendMessageAction {
  return {
    type: SEND_MESSAGE,
    payload: {
      ch: channelName,
      txt: messageText,
      uid: userId,
    },
  };
}

export type ReceiveMessageAction = {
  type: 'chat/receive message',
  payload: {
    msg: UserMessage,
    time: string,
  },
};
export function receiveMessage(
  msg: UserMessage,
  time: string
): ReceiveMessageAction {
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      msg,
      time,
    },
  };
}

export type ChatAction =
  | JoinChannelAction
  | SendMessageAction
  | ReceiveMessageAction;

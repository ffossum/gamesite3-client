/* @flow */
export const JOIN_CHANNEL = 'chat/join channel';
export const LEAVE_CHANNEL = 'chat/leave channel';
export const SEND_MESSAGE = 'chat/send message';
export const SEND_GAME_MESSAGE = 'chat/send game message';
export const RECEIVE_MESSAGE = 'chat/receive message';
export const CLEAR_CHAT = 'chat/clear';

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

export type LeaveChannelAction = {
  type: 'chat/leave channel',
  payload: string,
};
export function leaveChannel(channelName: ChannelName): LeaveChannelAction {
  return {
    type: LEAVE_CHANNEL,
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
  messageText: string,
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

export type SendGameMessageAction = {
  type: 'chat/send game message',
  payload: {
    players: string[],
    gameId: string,
    userId: string,
    text: string,
  },
};
export function sendGameMessage(
  userId: string,
  gameId: string,
  players: string[],
  text: string,
) {
  return {
    type: SEND_GAME_MESSAGE,
    payload: {
      userId,
      gameId,
      players,
      text,
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
  time: string,
): ReceiveMessageAction {
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      msg,
      time,
    },
  };
}

export type ClearChatAction = {
  type: 'chat/clear',
  payload: string,
};
export function clearChat(channelName: string) {
  return {
    type: CLEAR_CHAT,
    payload: channelName,
  };
}

export type ChatAction =
  | JoinChannelAction
  | LeaveChannelAction
  | SendMessageAction
  | SendGameMessageAction
  | ReceiveMessageAction
  | ClearChatAction;

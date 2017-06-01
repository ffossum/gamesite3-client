/* @flow */
import React from 'react';
import UserTextMessage from './UserTextMessage';
import type { UserChatMessage } from './UserTextMessage';
import ChatInput from './ChatInput';

type Props = {
  messages: UserChatMessage[],
  sendMessage: (text: string) => void,
};
export default function Chat(props: Props) {
  const { messages, sendMessage } = props;
  return (
    <div>
      <ul>
        {messages.map(msg => (
          <UserTextMessage key={msg.user.id + msg.time} message={msg} />
        ))}
      </ul>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

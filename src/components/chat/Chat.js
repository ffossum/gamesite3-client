/* @flow */
import React from 'react';
import UserTextMessage from './UserTextMessage';
import type { MessageProp } from './UserTextMessage';
import ChatInput from './ChatInput';

export type Props = {
  messages: MessageProp[],
  sendMessage: (text: string) => void,
};
export default function Chat(props: Props) {
  const { messages, sendMessage } = props;
  return (
    <div>
      <ul>
        {messages.map((msg, i) =>
          <UserTextMessage key={msg.user.id + i} message={msg} />
        )}
      </ul>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

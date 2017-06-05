/* @flow */
import React from 'react';

export type MessageProp = {
  user: PublicUserData,
  text: string,
};

type Props = {
  message: MessageProp,
};
export default function UserTextMessage(props: Props) {
  const { message } = props;
  return (
    <div>
      <strong>{message.user.username}</strong> <span>{message.text}</span>
    </div>
  );
}

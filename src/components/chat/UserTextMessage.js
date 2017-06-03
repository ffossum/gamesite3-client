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
      <span>{message.user.username}</span> <span>{message.text}</span>
    </div>
  );
}

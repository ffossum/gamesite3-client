/* @flow */
import React from 'react';

export type UserChatMessage = {
  user: PublicUserData,
  text: string,
  time: string,
};

type Props = {
  message: UserChatMessage,
};
export default function UserTextMessage(props: Props) {
  const { message } = props;
  return (
    <div>
      <span>{message.user.username}</span> <span>{message.text}</span>
    </div>
  );
}

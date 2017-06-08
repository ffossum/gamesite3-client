/* @flow */
import React from 'react';
import format from 'date-fns/format';

export type MessageProp = {
  user: PublicUserData,
  text: string,
  time: string,
};

const dateFormat = 'HH:mm';

type Props = {
  message: MessageProp,
};
export default function UserTextMessage(props: Props) {
  const { message } = props;
  return (
    <div>
      <strong>
        {format(message.time, dateFormat)} {message.user.username}
      </strong>
      {' '}<span>{message.text}</span>
    </div>
  );
}

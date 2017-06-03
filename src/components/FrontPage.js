/* @flow */
import React from 'react';
import ChatContainer from '../redux/modules/chat/ChatContainer';

export default function FrontPage() {
  return (
    <main>
      <h1>Welcome</h1>
      <section>
        <ChatContainer channelName="general" />
      </section>
    </main>
  );
}

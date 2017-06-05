/* @flow */
import React from 'react';
import ChatContainer from '../../redux/modules/chat/ChatContainer';

export default function Lobby() {
  return (
    <main>
      <section>
        <h2>Lobby</h2>
      </section>

      <section>
        <ChatContainer channelName="general" />
      </section>
    </main>
  );
}

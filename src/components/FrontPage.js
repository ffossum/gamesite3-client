/* @flow */
import React from 'react';
import Chat from './chat/Chat';

const sendMessage = () => {}

export default function FrontPage() {
  return (
    <main>
      <h1>Welcome</h1>
      <section>
        <Chat sendMessage={sendMessage} messages={[]} />
      </section>
    </main>
  );
}

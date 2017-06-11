/* @flow */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import type { SessionUser } from '../../redux/modules/session/sessionReducer';

import CreateGameForm from './CreateGameForm';
import ChatContainer from '../../redux/modules/chat/ChatContainer';

function CreateGameLink(props: ContextRouter) {
  const to = `${props.location.pathname}/create`;
  return <Link to={to}>Create game</Link>;
}

export type Props = {
  user?: ?SessionUser,
  games: Array<{
    id: string,
    host: PublicUserData,
    createdTime: string,
  }>,
  createGame: () => void,
};

export default function Lobby(props: Props) {
  const { createGame, games, user } = props;

  return (
    <main>
      <section>
        <h2>Lobby</h2>
        <Route exact path="/lobby" render={CreateGameLink} />
        <Route
          path="/lobby/create"
          render={() => <CreateGameForm user={user} createGame={createGame} />}
        />
        <ul>
          {games.map(game =>
            <li key={game.id}>
              <Link to={`/game/${game.id}`}>
                Host: {game.host.username}, created: {game.createdTime}
              </Link>
            </li>,
          )}
        </ul>
      </section>

      <section>
        <ChatContainer channelName="general" />
      </section>
    </main>
  );
}

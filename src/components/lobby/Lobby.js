/* @flow */
import React from 'react';
import { Link, Route } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import type { SessionUser } from '../../redux/modules/session/sessionReducer';
import format from 'date-fns/format';
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
    players: PublicUserData[],
    createdTime: string,
  }>,
  createGame: () => void,
  enterLobby: () => void,
  exitLobby: () => void,
};

export default class Lobby extends React.Component {
  props: Props;
  componentDidMount() {
    this.props.enterLobby();
  }
  componentWillUnmount() {
    this.props.exitLobby();
  }
  render() {
    const { createGame, games, user } = this.props;

    return (
      <main>
        <section>
          <h2>Lobby</h2>
          <Route exact path="/lobby" render={CreateGameLink} />
          <Route
            path="/lobby/create"
            render={() =>
              <CreateGameForm user={user} createGame={createGame} />}
          />
          <ul>
            {games.map(game =>
              <li key={game.id}>
                <Link to={`/game/${game.id}`}>
                  Host: {game.host.username}, created:{' '}
                  {format(game.createdTime, 'ddd, MMM Do HH:mm')}
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
}

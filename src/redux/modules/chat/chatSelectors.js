/* @flow */
import { createSelector } from 'reselect';
import type { State } from '../root';
import type {
  Props as ChatOwnProps,
  StateProps as ChatStateProps,
} from './ChatContainer';
import type {
  Props as GameChatOwnProps,
  StateProps as GameChatStateProps,
} from './GameChatContainer';

const getChat = (state: State) => state.chat;
const getUsers = (state: State) => state.users;
const getUser = (state: State) => state.session.user;
const getGames = (state: State) => state.games;

function createGetGameSelector(gameId: string) {
  return createSelector(getGames, games => games[gameId]);
}

function createMessagesSelector(channelName: string) {
  return createSelector(getChat, chat => {
    const channel = chat[channelName];
    return channel ? channel.messages : [];
  });
}

export function createChatContainerSelector(
  channelName: string,
): (State, ChatOwnProps) => ChatStateProps {
  return createSelector(
    createMessagesSelector(channelName),
    getUsers,
    getUser,
    (messages, users, user) => {
      return {
        user,
        messages: messages.map(msg => {
          const msgUser = users[msg.userId];
          const msgUsername = msgUser ? msgUser.username : '';
          return {
            user: {
              id: msg.userId,
              username: msgUsername,
            },
            text: msg.text,
            time: msg.time,
          };
        }),
      };
    },
  );
}

export function createGameChatContainerSelector(
  gameId: string,
): (State, GameChatOwnProps) => GameChatStateProps {
  const channelName = `game:${gameId}`;

  return createSelector(
    createChatContainerSelector(channelName),
    createGetGameSelector(gameId),
    (chatContainerProps, game) => {
      const { user, messages } = chatContainerProps;

      return {
        game,
        messages,
        user,
      };
    },
  );
}

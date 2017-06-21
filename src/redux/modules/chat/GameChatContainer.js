/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chat from '../../../components/chat/Chat';
import type { Props as ChatProps } from '../../../components/chat/Chat';
import { sendGameMessage } from './chatActions';
import type { State } from '../root';

type Props = {
  gameId: string,
};

export function mapStateToProps(state: State, ownProps: Props) {
  const { gameId } = ownProps;
  const channelName = `game:${ownProps.gameId}`;
  const channel = state.chat[channelName] || {};
  const messages = channel.messages || [];
  const game = state.games[gameId];

  return {
    channelName,
    game,
    user: state.session.user,
    messages: messages.map(msg => {
      const msgUser = state.users[msg.userId];
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
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ sendGameMessage }, dispatch);
}

export function mergeProps(
  stateProps: *,
  dispatchProps: *,
  ownProps: Props,
): ChatProps {
  const { game, user } = stateProps;

  let partialSendMessage = () => {};

  if (game && user) {
    partialSendMessage = messageText => {
      dispatchProps.sendGameMessage(
        user.id,
        game.id,
        game.players,
        messageText,
      );
    };
  }

  return {
    ...stateProps,
    ...ownProps,
    sendMessage: partialSendMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chat);

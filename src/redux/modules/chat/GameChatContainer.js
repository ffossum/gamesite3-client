/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chat from '../../../components/chat/Chat';
import type { Props as ChatProps } from '../../../components/chat/Chat';
import { sendGameMessage } from './chatActions';
import type { State } from '../root';
import { createGameChatContainerSelector } from './chatSelectors';
import type { GameDataState } from '../games/gamesReducer';
import type { MessageProp } from '../../../components/chat/UserTextMessage';
import type { SessionUser } from '../session/sessionReducer';

export type Props = {
  gameId: string,
};
export type StateProps = {
  game: ?GameDataState,
  messages: MessageProp[],
  user: ?SessionUser,
};

export function mapStateToProps(state: ?State, ownProps: Props) {
  return createGameChatContainerSelector(ownProps.gameId);
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ sendGameMessage }, dispatch);
}

export function mergeProps(
  stateProps: StateProps,
  dispatchProps: *,
): ChatProps {
  const { game, messages, user } = stateProps;

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
    messages,
    sendMessage: partialSendMessage,
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chat);

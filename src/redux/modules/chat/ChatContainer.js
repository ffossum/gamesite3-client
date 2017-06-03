/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chat from '../../../components/chat/Chat';
import type { Props as ChatProps } from '../../../components/chat/Chat';
import { sendMessage } from './chatActions';
import type { State } from '../root';

type Props = {
  channelName: string,
};

export default connect(
  (state: State, ownProps: Props) => {
    const channel = state.chat[ownProps.channelName] || {};
    const messages = channel.messages || [];

    return {
      user: state.session.user,
      messages: messages.map(msg => ({
        user: {
          id: msg.userId,
          username: msg.userId, // TODO
        },
        text: msg.text,
      })),
    };
  },
  (dispatch: Dispatch<*>) => bindActionCreators({ sendMessage }, dispatch),
  (stateProps, dispatchProps, ownProps: Props): ChatProps => {
    const userId = stateProps.user && stateProps.user.id;
    let partialSendMessage = () => {};

    if (userId) {
      partialSendMessage = messageText => {
        dispatchProps.sendMessage(userId, ownProps.channelName, messageText);
      };
    }

    return {
      ...stateProps,
      ...ownProps,
      sendMessage: partialSendMessage,
    };
  }
)(Chat);

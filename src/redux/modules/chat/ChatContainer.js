/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chat from '../../../components/chat/Chat';
import type { Props as ChatProps } from '../../../components/chat/Chat';
import { sendMessage } from './chatActions';

type Props = {
  channelName: string,
};

export default connect(
  state => ({
    user: state.session.user,
    messages: [],
  }),
  (dispatch: Dispatch<*>) => bindActionCreators({ sendMessage }, dispatch),
  (stateProps, dispatchProps, ownProps: Props): ChatProps => {
    const userId = stateProps.user && stateProps.user.id;

    const partialSendMessage = messageText => {
      dispatchProps.sendMessage(userId, ownProps.channelName, messageText);
    };

    return {
      ...stateProps,
      ...ownProps,
      sendMessage: partialSendMessage,
    };
  }
)(Chat);

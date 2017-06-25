/* @flow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chat from '../../../components/chat/Chat';
import type { Props as ChatProps } from '../../../components/chat/Chat';
import { sendMessage } from './chatActions';
import type { State } from '../root';
import { createChatContainerSelector } from './chatSelectors';
import type { MessageProp } from '../../../components/chat/UserTextMessage';

export type Props = {
  channelName: string,
};
export type StateProps = {
  user: ?PublicUserData,
  messages: MessageProp[],
};

export function mapStateToProps(state: ?State, ownProps: Props) {
  return createChatContainerSelector(ownProps.channelName);
}

export function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ sendMessage }, dispatch);
}

export function mergeProps(
  stateProps: StateProps,
  dispatchProps: *,
  ownProps: Props,
): ChatProps {
  const { messages, user } = stateProps;
  let partialSendMessage = () => {};

  if (user) {
    partialSendMessage = messageText => {
      dispatchProps.sendMessage(user.id, ownProps.channelName, messageText);
    };
  }

  return {
    messages,
    sendMessage: partialSendMessage,
    user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chat);

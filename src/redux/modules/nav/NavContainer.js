/* @flow */
import { connect } from 'react-redux';
import Nav from '../../../components/nav/Nav';

export default connect(
  state => ({
    user: state.session.user,
  }),
  () => ({}),
)(Nav);

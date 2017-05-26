/* @flow */
import { connect } from 'react-redux';
import RegistrationForm from './RegistrationForm';
import { register } from '../../actions/registrationActions';

export default connect(
  () => ({}),
  (dispatch: Dispatch<*>) => ({
    register(...args) {
      dispatch(register(...args));
    },
  })
)(RegistrationForm);

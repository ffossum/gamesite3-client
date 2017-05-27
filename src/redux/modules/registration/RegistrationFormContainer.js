/* @flow */
import { connect } from 'react-redux';
import RegistrationForm
  from '../../../components/registration/RegistrationForm';
import { register } from './registrationActions';

export default connect(
  () => ({}),
  (dispatch: Dispatch<*>) => ({
    register(...args) {
      dispatch(register(...args));
    },
  })
)(RegistrationForm);

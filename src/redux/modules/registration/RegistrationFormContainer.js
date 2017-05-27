/* @flow */
import { connect } from 'react-redux';
import RegistrationForm
  from '../../../components/registration/RegistrationForm';
import { registrationRequest } from './registrationActions';

export default connect(
  () => ({}),
  (dispatch: Dispatch<*>) => ({
    register(...args) {
      dispatch(registrationRequest(...args));
    },
  })
)(RegistrationForm);

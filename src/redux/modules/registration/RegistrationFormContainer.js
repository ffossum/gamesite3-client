/* @flow */
import { connect } from 'react-redux';
import RegistrationForm from '../../../components/registration/RegistrationForm';
import { registrationRequest } from './registrationActions';

import type { State } from '../root';

export default connect(
  (state: State) => ({
    loading: state.registration.loading,
  }),
  (dispatch: Dispatch<*>) => ({
    register(...args) {
      dispatch(registrationRequest(...args));
    },
  }),
)(RegistrationForm);

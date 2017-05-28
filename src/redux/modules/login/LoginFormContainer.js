/* @flow */
import { connect } from 'react-redux';
import RegistrationForm from '../../../components/login/LoginForm';
import { loginRequest } from './loginActions';

import type { State } from '../root';

export default connect(
  (state: State) => ({
    loading: state.registration.loading,
  }),
  (dispatch: Dispatch<*>) => ({
    logIn(...args) {
      dispatch(loginRequest(...args));
    },
  })
)(RegistrationForm);

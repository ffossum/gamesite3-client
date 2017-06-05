/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavContainer from './redux/modules/nav/NavContainer';
import FrontPage from './components/FrontPage';
import RegistrationFormContainer from './redux/modules/registration/RegistrationFormContainer';
import LoginFormContainer from './redux/modules/login/LoginFormContainer';
import Lobby from './components/lobby/Lobby';
import NotFound from './components/NotFound';

export default function Routes() {
  return (
    <div>
      <NavContainer />
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route path="/lobby" component={Lobby} />
        <Route
          exact
          path="/registration"
          component={RegistrationFormContainer}
        />
        <Route exact path="/login" component={LoginFormContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

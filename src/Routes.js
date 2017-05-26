/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import RegistrationForm from './registration/RegistrationForm';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={FrontPage} />
      <Route exact path="/registration" component={RegistrationForm} />
      <Route component={NotFound} />
    </Switch>
  );
}

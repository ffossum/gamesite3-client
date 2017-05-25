/* @flow */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={FrontPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

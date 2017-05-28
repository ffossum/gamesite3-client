/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        <li><Link to="/registration">Register</Link></li>
        <li><Link to="/login">Log in</Link></li>
        <li><a href="/logout">Log out</a></li>
      </ul>
    </nav>
  );
}

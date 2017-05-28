/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  user?: SessionUser,
};
export default function Nav(props: Props) {
  const { user } = props;
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        {user
          ? [
              <li key="user">Logged in as: {user.username}</li>,
              <li key="logout"><a href="/logout">Log out</a></li>
          ]
          : [
              <li key="registration">
                <Link to="/registration">Register</Link>
              </li>,
              <li key="login"><Link to="/login">Log in</Link></li>,
            ]}
      </ul>
    </nav>
  );
}

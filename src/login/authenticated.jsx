import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <form>
        <div>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

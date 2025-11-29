import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
      <div>
        <form>
        <div>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='username' />
        </div>
        <div>
          <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <button onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
        <button onClick={() => createUser()} disabled={!userName || !password}>Create</button>
      </form>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
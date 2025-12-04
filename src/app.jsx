import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { History } from './history/history';
import { Popular } from './popular/popular';
import { Today } from './today/today';
import { AuthState } from './login/authState';

export default function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
    <div className="body">
      <header>

        <h1>Startup</h1>

      <nav>
             <menu>
              {authState === AuthState.Authenticated && (
              <li>
                <NavLink  to=''>
                  Home
                </NavLink>
              </li>
              )}
              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink to='today'>
                    Choose
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink to='history'>
                    History
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li >
                  <NavLink to='popular'>
                    People
                  </NavLink>
                </li>
              )}
            </menu>
</nav>

    </header>

      <Routes>
  <Route path='/' element={<Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />} exact />
  <Route path='/today' element={<Today />} />
  <Route path='/history' element={<History />} />
  <Route path='/popular' element={<Popular />} />
  <Route path='*' element={<NotFound />} />
</Routes>

      <footer>
      <NavLink to="https://github.com/clarebwood/startup.git">Clare Wood (Source)</NavLink>
      {authState === AuthState.Authenticated && <div className="username">{userName}</div>}
      {authState === AuthState.Unauthenticated && <div className="username"></div>}
    </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main >404: Return to sender. Address unknown.</main>;
}
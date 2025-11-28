import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { History } from './history/history';
import { Popular } from './popular/popular';
import { Today } from './today/today';

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <header>

        <h1>Startup</h1>

      <nav>
  <menu>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/today">Today</NavLink></li>
    <li><NavLink to="/history">History</NavLink></li>
    <li><NavLink to="/popular">Popular</NavLink></li>
  </menu>
</nav>

    </header>

      <Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/today' element={<Today />} />
  <Route path='/history' element={<History />} />
  <Route path='/popular' element={<Popular />} />
  <Route path='*' element={<NotFound />} />
</Routes>

      <footer>
      <NavLink to="https://github.com/clarebwood/startup.git">Clare Wood (Source)</NavLink>
    </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main >404: Return to sender. Address unknown.</main>;
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div>
      <header>

        <h1>Startup</h1>

      <nav>
        <menu>
          <li><a href="index.html">Home</a></li>
          <li><a href="today.html">Today</a></li>
          <li><a href="history.html">History</a></li>
          <li><a href="popular.html">Popular</a></li>
        </menu>
      </nav>

    </header>

      <main>App components go here</main>

      <footer>
      <a href="https://github.com/clarebwood/startup.git">Clare Wood (Source)</a>
    </footer>
    </div>
  );
}
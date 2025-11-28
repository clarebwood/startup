import React from 'react';

export function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <div>
          <input type="text" placeholder="email" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
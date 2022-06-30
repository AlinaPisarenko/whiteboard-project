import { useHistory } from "react-router-dom";
import React from "react";

export default function Login({ onLogin }) {
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    let form = new FormData(document.querySelector(`#signup-form`));
    let response = await fetch(`/login`, {
      method: `POST`,
      body: form,
    });

    if (response.ok) {
      let user = await response.json();
      history.push(`/me`);
      console.log(user);
      onLogin(user);
    } else {
      response.json().then((err) => console.log(err.errors));
    }
  };

  return (
    <div>
      <form className="form" id="signup-form" onSubmit={handleLogin}>
        <h2>Welcome back</h2>
        <div className="form__group">
          <input
            type="text"
            className="form__input"
            placeholder="Username"
            id="name"
            name="username"
          />
          <label htmlFor="name" className="form__label">
            Username
          </label>
        </div>
        <div className="form__group">
          <input
            type="password"
            className="form__input"
            placeholder="Password"
            id="password"
            name="password"
          />
          <label htmlFor="password" className="form__label">
            Password
          </label>
        </div>

        <div className="form__group">
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";

export default function Signup({ onLogin, teams }) {
  let history = useHistory();
  console.log(teams);
  const handleSignup = async (e) => {
    e.preventDefault();
    let form = new FormData(document.querySelector(`#signup-form`));
    let req = await fetch(`/signup`, {
      method: `POST`,
      body: form,
    });
    let user = await req.json();
    onLogin(user);
    history.push(`/me`);
  };

  if (!teams) return "loading";
  return (
    <div>
      <form
        className="form sign-up-form"
        id="signup-form"
        onSubmit={handleSignup}
      >
        <h2>Welcome</h2>
        <div className="form__group">
          <input
            type="text"
            className="form__input"
            placeholder="Full Name"
            id="name"
            name="name"
          />
          <label htmlFor="name" className="form__label">
            Full name
          </label>
        </div>

        <div className="form__group">
          <input
            type="text"
            className="form__input"
            placeholder="Username"
            id="username"
            name="username"
          />
          <label htmlFor="username" className="form__label">
            Username
          </label>
        </div>

        <div className="form__group">
          <input
            type="email"
            className="form__input"
            placeholder="Email"
            id="email"
            name="email"
          />
          <label htmlFor="email" className="form__label">
            Email
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
          <input
            type="password"
            className="form__input"
            placeholder="Confirm password"
            id="confirmed-password"
            name="confirmed-password"
          />
          <label htmlFor="confirmed-password" className="form__label">
            Confirm password
          </label>
        </div>

        <div className="form__group">
          <input
            type="text"
            className="form__input"
            placeholder="Image URL"
            id="profile_img"
            name="profile_img"
          />
          <label htmlFor="profile_img" className="form__label">
            Image URL
          </label>
        </div>

        <div className="form__group">
          <select name="team_id" id="team">
            {teams.map((el) => {
              return <option value={el.id}> {el.name} </option>;
            })}
          </select>
          <label htmlFor="team" className="form__label">
            Choose your team
          </label>
        </div>

        <div className="form__group">
          <button>Sign up</button>
        </div>
      </form>
    </div>
  );
}

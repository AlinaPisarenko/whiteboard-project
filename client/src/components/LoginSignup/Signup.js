import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Signup({ onLogin, setHomeDisplay }) {
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  //fetching data on all teams
  let history = useHistory();
  useEffect(() => {
    fetch("/teams").then((r) => {
      if (r.ok) {
        r.json().then((data) => setTeams(data));
      }
    });
  }, []);

  //function that handles signup
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

  if (!teams) return "";
  return (
    <div className={loading ? "login" : "login timeout"}>
      <h2 className="login__greeting login__greeting__signup">Welcome!</h2>
      <form
        className="login__form signup"
        id="signup-form"
        onSubmit={handleSignup}
      >
        <div className="login__form__group login__form__group__signup">
          <input
            type="text"
            className="login__form__input"
            id="name"
            name="name"
            required=" "
          />
          <label htmlFor="name" className="login__form__label">
            Full name
          </label>
        </div>

        <div className="login__form__group login__form__group__signup">
          <input
            type="text"
            className="login__form__input"
            id="username"
            name="username"
            required=" "
          />
          <label
            htmlFor="username"
            className="login__form__label login__form__group__signup"
          >
            Username
          </label>
        </div>

        <div className="login__form__group login__form__group__signup">
          <input
            type="email"
            className="login__form__input"
            id="email"
            name="email"
            required=" "
          />
          <label htmlFor="email" className="login__form__label">
            Email
          </label>
        </div>

        <div className="login__form__group login__form__group__signup">
          <input
            type="password"
            className="login__form__input"
            id="password"
            name="password"
            required=" "
          />
          <label htmlFor="password" className="login__form__label">
            Password
          </label>
        </div>

        <div className="login__form__group login__form__group__signup">
          <input
            type="password"
            className="login__form__input"
            id="confirmed-password"
            name="confirmed-password"
            required=" "
          />
          <label htmlFor="confirmed-password" className="login__form__label">
            Confirm password
          </label>
        </div>

        <div className="login__form__group login__form__group__signup">
          <input
            type="text"
            className="login__form__input"
            id="profile_img"
            name="profile_img"
            required=" "
          />
          <label htmlFor="profile_img" className="login__form__label">
            Image URL
          </label>
        </div>

        <div className="login__form__group login__form__group__signup dropdown">
          <select
            required=" "
            className="login__form__input"
            name="team_id"
            id="team"
          >
            <option> </option>
            {teams.map((el) => {
              return <option value={el.id}> {el.name} </option>;
            })}
          </select>
          <label htmlFor="team" className="login__form__label">
            Choose your team
          </label>
        </div>

        <div className="login__form__group">
          <button className="btn login__btn-text signup-btn">Sign up</button>
        </div>
        <p className="login__form__alt">
          Have an account already?{" "}
          <a
            className="login__form__alt__link"
            href="#"
            onClick={() => setHomeDisplay("login")}
          >
            Login
          </a>{" "}
          instead.
        </p>
      </form>
    </div>
  );
}

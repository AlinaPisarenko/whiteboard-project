import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login({ onLogin }) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

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
    <div className={loading ? "login" : "login timeout "}>
      <h2 className="login__greeting">Welcome back</h2>
      <form className="login__form" id="signup-form" onSubmit={handleLogin}>
        <div className="login__form__group">
          <input
            type="text"
            className="login__form__input"
            id="name"
            name="username"
            required=" "
          />
          <label htmlFor="name" className="login__form__label">
            Username
          </label>
        </div>
        <div className="login__form__group">
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

        <div className="login__form__group">
          <button className="btn login__btn-text">Log in</button>
        </div>
      </form>
    </div>
  );
}

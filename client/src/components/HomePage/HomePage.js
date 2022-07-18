import { useState } from "react";
import Typed from "react-typed";
import Signup from "../LoginSignup/Signup";
import Login from "../LoginSignup/Login";

export default function HomePage({ onLogin, allUsers }) {
  const [homeDisplay, setHomeDisplay] = useState("none");

  const handleOpenLogIn = (e) => {
    setHomeDisplay("login");
  };

  const handleOpenSignup = () => {
    setHomeDisplay("signup");
  };

  return (
    <div className="homepage">
      <h1
        className={
          homeDisplay === "none"
            ? "homepage__page-title"
            : "homepage__page-title moved"
        }
      >
        Purple
      </h1>
      <Typed
        className={
          homeDisplay === "none"
            ? "homepage__type-effect"
            : "homepage__type-effect moved-p"
        }
        strings={["I love to create.", "I love design.", "I love to share."]}
        typeSpeed={150}
        backSpeed={100}
        loop
      />
      {homeDisplay === "none" ? (
        <div className="homepage__btn-group">
          <a
            onClick={(e) => handleOpenLogIn(e)}
            className="btn homepage__btn"
            href="#"
          >
            Log in
          </a>
          <a onClick={handleOpenSignup} className="btn homepage__btn" href="#">
            Sign up
          </a>
        </div>
      ) : null}

      {homeDisplay === "login" ? (
        <Login onLogin={onLogin} setHomeDisplay={setHomeDisplay} />
      ) : null}
      {homeDisplay === "signup" ? (
        <Signup onLogin={onLogin} setHomeDisplay={setHomeDisplay} />
      ) : null}
    </div>
  );
}

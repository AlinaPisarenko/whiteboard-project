import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/main.scss";
import Signup from "./LoginSignup/Signup";
import Login from "./LoginSignup/Login";
import HomePage from "./HomePage/HomePage";
import UserPage from "./UserPage/UserPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const onLogin = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={onLogin} />
          </Route>
          <Route exact path="/me">
            {!user ? "loading" : <UserPage user={user} setUser={setUser} />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

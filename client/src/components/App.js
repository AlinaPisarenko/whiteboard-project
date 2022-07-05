import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/main.scss";
import Signup from "./LoginSignup/Signup";
import Login from "./LoginSignup/Login";
import HomePage from "./HomePage/HomePage";
import Navbar from "./NavBar/NavBar";
import UserPage from "./UserPage/UserPage";
import Projects from "./Projects/Projects";

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [displayScreen, setDisplayScreen] = useState("projects");

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/teams").then((r) => {
      if (r.ok) {
        r.json().then((data) => setTeams(data));
      }
    });
  }, []);

  const onLogin = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {user ? (
          <Navbar
            setUser={setUser}
            user={user}
            setDisplayScreen={setDisplayScreen}
            displayScreen={displayScreen}
          />
        ) : null}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/projects">
            <Projects user={user} />
          </Route>
          <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={onLogin} teams={teams} />
          </Route>
          <Route exact path="/me">
            {!user ? (
              "loading"
            ) : (
              <UserPage
                user={user}
                setUser={setUser}
                displayScreen={displayScreen}
              />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

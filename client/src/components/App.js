import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/main.scss";
import Signup from "./LoginSignup/Signup";
import Login from "./LoginSignup/Login";
import HomePage from "./HomePage/HomePage";
import Navbar from "./NavBar/NavBar";
import UserPage from "./UserPage/UserPage";
import Projects from "./Projects/Projects";
import Whiteboard from "./Whiteboard/Whiteboard";
import EachProjectView from "./EachProjectView/EachProjectView";

function App() {
  const [user, setUser] = useState(null);

  const [displayScreen, setDisplayScreen] = useState("projects");
  const [displayedProject, setDisplayedProject] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setAllUsers(data));
  }, []);

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
  // const onUpdateProject = (updatedProject) => {
  //   onUpdateList(updatedProject);
  // };

  if (!allUsers) return "loading";

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
            <HomePage onLogin={onLogin} allUsers={allUsers} />
          </Route>
          <Route exact path="/projects">
            <Projects user={user} allUsers={allUsers} />
          </Route>
          {/* <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={onLogin} />
          </Route> */}
          <Route exact path="/projects/:id">
            <Whiteboard
              user={user}
              displayedProject={displayedProject}
              // onUpdateProject={onUpdateProject}
            />
          </Route>
          <Route exact path="/projects/:id">
            <EachProjectView user={user} />
          </Route>
          <Route exact path="/me">
            {!user ? (
              "loading"
            ) : (
              <UserPage
                user={user}
                setUser={setUser}
                allUsers={allUsers}
                displayScreen={displayScreen}
                setDisplayScreen={setDisplayScreen}
                setDisplayedProject={setDisplayedProject}
              />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

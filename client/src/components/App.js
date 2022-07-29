import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/main.scss";

import HomePage from "./HomePage/HomePage";
import Navbar from "./NavBar/NavBar";
import UserPage from "./UserPage/UserPage";
import Projects from "./Projects/Projects";
import Whiteboard from "./Whiteboard/Whiteboard";

function App() {
  const [user, setUser] = useState(null);
  const [displayScreen, setDisplayScreen] = useState("projects");
  const [displayedProject, setDisplayedProject] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [projects, setProjects] = useState(null);

  //checking if user is logged in on load
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          setProjects(user.projects);
        });
      }
    });
  }, []);

  //fetching info on all users
  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setAllUsers(data));
  }, []);

  const onLogin = (userInfo) => {
    setUser(userInfo);
    setProjects(userInfo.projects);
  };

  if (!allUsers) return <span className="loader"></span>;

  //function that updates DOM after project is updated
  const onUpdateProject = (updatedProject) => {
    let updatedProjects = user.projects.filter((el) =>
      el.id !== updatedProject.id ? true : false
    );
    setProjects([...updatedProjects, updatedProject]);
    setDisplayScreen("projects");
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
            <HomePage onLogin={onLogin} allUsers={allUsers} />
          </Route>
          <Route exact path="/projects">
            <Projects user={user} allUsers={allUsers} />
          </Route>
          <Route exact path="/projects/:id">
            <Whiteboard
              user={user}
              displayedProject={displayedProject}
              onUpdateProject={onUpdateProject}
            />
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
                projects={projects}
                setProjects={setProjects}
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

import React from "react";
import { useHistory } from "react-router-dom";

export default function NavBar({ setUser, setDisplayScreen, displayScreen }) {
  const history = useHistory();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push(`/`);
      }
    });
  }
  function handleAddNew(e) {
    e.preventDefault();
    history.push(`/me`);
    setDisplayScreen("add-new");
  }

  function handleViewAllProjects(e) {
    e.preventDefault();
    history.push(`/projects`);
    setDisplayScreen("all-projects");
  }

  function handleViewProjects(e) {
    e.preventDefault();
    history.push(`/me`);
    setDisplayScreen("projects");
  }

  return (
    <div
      className={
        displayScreen === "add-new" ? "navigation-create-new" : "navigation"
      }
    >
      <ul
        className="menu-bar"
        // style={
        //   displayScreen === "add-new"
        //     ? { backgroundColor: "rgba(255, 255, 255, 0.4)" }
        //     : null
        // }
      >
        {}
        <a href="#" className="nav-link" onClick={handleViewProjects}>
          My Projects
        </a>

        <a href="#" className="nav-link" onClick={handleViewAllProjects}>
          All projects
        </a>

        <a href="#" className="nav-link" onClick={handleAddNew}>
          Create New
        </a>

        <a href="#" className="nav-link" onClick={handleLogoutClick}>
          Log out
        </a>
      </ul>
    </div>
  );
}

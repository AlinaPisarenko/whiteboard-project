import React from "react";
import { useHistory } from "react-router-dom";
import logo from "./nav-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faGlobe,
  faCirclePlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

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
  }

  function handleViewProjects(e) {
    e.preventDefault();
    history.push(`/me`);
    setDisplayScreen("projects");
  }

  return (
    <div className="navigation">
      <img className="nav-bar-new" src={logo} />
      <ul className="menu-bar">
        {}
        <a href="#" className="nav-link" onClick={handleViewProjects}>
          <FontAwesomeIcon icon={faFolderClosed} />
        </a>
        <a href="#" className="nav-link" onClick={handleViewAllProjects}>
          <FontAwesomeIcon icon={faGlobe} />
        </a>

        <a href="#" className="nav-link" onClick={handleAddNew}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </a>

        <a href="#" className="nav-link" onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </a>
      </ul>
    </div>
  );
}

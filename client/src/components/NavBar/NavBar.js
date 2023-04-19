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
        console.log("hello")
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

    <nav class="nav__cont">
      <ul class="nav">
        <li class="nav__items ">
          <FontAwesomeIcon icon={faFolderClosed} />
          <a href="" onClick={handleViewProjects}>
            My Projects
          </a>
        </li>

        <li class="nav__items ">
          <FontAwesomeIcon icon={faGlobe} />

          <a href="" onClick={handleViewAllProjects}>
            Search All
          </a>
        </li>

        <li class="nav__items ">
          <FontAwesomeIcon icon={faCirclePlus} />
          <a href="" onClick={handleAddNew}>
            Create New
          </a>
        </li>

        <li class="nav__items ">
          <FontAwesomeIcon icon={faRightFromBracket} />

          <a href="" onClick={handleLogoutClick}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

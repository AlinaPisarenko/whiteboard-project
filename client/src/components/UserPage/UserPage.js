import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EachProject from "../EachProject/EachProject";
import Whiteboard from "../Whiteboard/Whiteboard";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

export default function UserPage({
  user,
  displayScreen,
  setDisplayedProject,
  setDisplayScreen,
  allProjects,
  allUsers,
  projects,
  setProjects,
}) {
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();

  //getting value of arch input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //filtering project according to search input
  const filteredProjects = projects.filter((el) =>
    el.title.toLowerCase().includes(search.toLowerCase())
  );

  //map to display every project component
  const mapProjects = filteredProjects.map((el) => {
    return (
      <EachProject
        setDisplayScreen={setDisplayScreen}
        key={el.id}
        project={el}
        setDisplayedProject={setDisplayedProject}
        onDeleteProject={onDeleteProject}
      />
    );
  });

  //function that updates DOM after deleting a project
  function onDeleteProject(id) {
    let projectsToDisplay = projects.filter((el) => el.id !== id);
    setProjects(projectsToDisplay);
  }

  //function that updates DOM after adding a project
  const onAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="userpage">
      {displayScreen === "projects" ? (
        <div className="user-projects">
          <div className="login__form__group search-bar">
            <input
              id="search"
              type="text"
              onChange={handleSearch}
              value={search}
              className="login__form__input search-bar__input"
              placeholder="Search"
            />
          </div>

          {!projects ? (
            <span className="loader"></span>
          ) : (
            <>
              <h2 className="all-prj">My Projects</h2>
              <div className="carousel">{mapProjects}</div>
            </>
          )}
        </div>
      ) : (
        <>
          {displayScreen === "add-new"} ?
          <div className="whiteboard">
            <Whiteboard
              user={user}
              team={team}
              onAddProject={onAddProject}
              projects={projects}
              setProjects={setProjects}
              setDisplayScreen={setDisplayScreen}
            />
          </div>
        </>
      )}

      {displayScreen === "add-new" ? null : (
        <ProfileInfo allUsers={allUsers} user={user} />
      )}
    </div>
  );
}

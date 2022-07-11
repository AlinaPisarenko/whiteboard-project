import React from "react";
import { useHistory } from "react-router-dom";

export default function EachProject({
  project,
  setDisplayedProject,
  onDeleteProject,
}) {
  const history = useHistory();
  const { id, title, description, whiteboard } = project;
  const desc = description.substring(0, 120) + "...";
  const handleClick = (e) => {
    e.preventDefault(e);
    setDisplayedProject(project);
    history.push(`/projects/${id}`);
  };

  function handleDelete() {
    fetch(`/projects/${id}`, { method: "DELETE" });
    onDeleteProject(id);
  }

  //   console.log(project);
  return (
    <div className="project-container">
      <div className="each-project" onClick={handleClick}>
        <img src={whiteboard} className="project-img"></img>

        <svg className="svg-element" id={project.id}>
          <path
            fill="#ff09ff"
            fillOpacity="0.6"
            d="M 0 59 Q 1 3 52 22 Q 151 55 247 24 Q 300 0 300 59 L 300 100 Q 300 150 250 150 L 50 150 Q 0 150 0 100 Z"
          ></path>
        </svg>
        <h4 className="project-title">{title}</h4>
        <p className="project-description">
          {" "}
          {description.length > 120 ? desc : description}{" "}
        </p>
      </div>
      <a
        href="#"
        className="project-container__delete-btn"
        onClick={handleDelete}
      >
        &times;
      </a>
    </div>
  );
}

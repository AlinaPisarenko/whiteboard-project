import React from "react";
import { useHistory } from "react-router-dom";

export default function EachProject({
  project,
  setDisplayedProject,
  onDeleteProject,
  setDisplayScreen,
}) {
  const history = useHistory();
  const { id, title, description, whiteboard } = project;
  const desc = description.substring(0, 150) + "...";

  const handleClick = (e) => {
    e.preventDefault(e);
    setDisplayedProject(project);
    setDisplayScreen("add-new");
    history.push(`/projects/${id}`);
  };

  //deleting project
  function handleDelete() {
    fetch(`/projects/${id}`, { method: "DELETE" });
    onDeleteProject(id);
  }

  return (
    <div className="card-each" onClick={handleClick}>
      <div class="card-each__side card-each__side--front">
        <h4 className="project-title-personal">{title}</h4>
        <p className="project-description-personal">
          {description.length > 150 ? desc : description}{" "}
        </p>
        <a href="#" className="delete-personal" onClick={handleDelete}>
          &times;
        </a>
      </div>
      {/* <img src={whiteboard} className="project-img-personal"></img>

          <svg className="svg-element-personal" id={project.id}>
            <path
              fill="#f386f7"
              fillOpacity="0.7"
              d="M 0 59 Q 1 3 52 22 Q 151 55 247 24 Q 300 0 300 59 L 300 100 Q 300 150 250 150 L 50 150 Q 0 150 0 100 Z"
            ></path>
          </svg>
          <h4 className="project-title-personal">{title}</h4>
          <p className="project-description-personal">
            {" "}
            {description.length > 170 ? desc : description}{" "}
          </p> */}

      <div class="card-each__side card-each__side--back ">
        <img src={whiteboard} className="project-img-personal"></img>
        <a href="#" className="delete-personal" onClick={handleDelete}>
          &times;
        </a>
      </div>
    </div>
  );
}

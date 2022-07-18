import React from "react";
import { useHistory } from "react-router-dom";

export default function SingleProject({
  project,
  handleOpenProject,
  setSelectedProject,
}) {
  const { id, description, title, whiteboard } = project;
  const { name, profile_img } = project.user;

  const handleOpen = (e) => {
    e.preventDefault();
    setSelectedProject(project);
    handleOpenProject();
  };

  return (
    <div className="project-container">
      <div onClick={handleOpen} className="each-project">
        <img src={whiteboard} className="project-img"></img>

        <svg className="svg-element" id={project.id}>
          <path
            fill="#f386f7"
            fillOpacity="0.7"
            d="M 0 59 Q 1 3 52 22 Q 151 55 247 24 Q 300 0 300 59 L 300 100 Q 300 150 250 150 L 50 150 Q 0 150 0 100 Z"
          ></path>
        </svg>

        <h4 className="project-title title">{title}</h4>
        <p className="project-description description">Created by: {name}</p>

        <div className="img-wrap">
          <img src={profile_img} className="user-project-img"></img>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="each-project">
  <div className="each-project__info">
    <h4 className="project-title">{title}</h4>
    <p className="project-description">
      {description.length > 140 ? desc : description}
    </p>
  </div>

  <img src={whiteboard} className="project-img"></img>

  <div className="btn-div"></div>
</div>; */
}

import React from "react";
import { useHistory } from "react-router-dom";

export default function EachProject({ project }) {
  const history = useHistory();
  const { id, title, description, whiteboard } = project;
  const desc = description.substring(0, 140) + "...";
  // const handleClick = (e) => {
  //   e.preventDefault(e);
  //   history.push(`/projects/${id}`);
  // };

  //   console.log(project);
  return (
    <div className="each-project">
      <img src={whiteboard} className="project-img"></img>

      <svg className="svg-element" id={project.id}>
        <path
          fill="#f5ff"
          fillOpacity="0.7"
          d="M 0 59 Q 1 3 52 22 Q 151 55 247 24 Q 300 0 300 59 L 300 100 Q 300 150 250 150 L 50 150 Q 0 150 0 100 Z"
        ></path>
      </svg>
      <h4 className="project-title">{title}</h4>
      <p className="project-description">
        {" "}
        {description.length > 140 ? desc : description}{" "}
      </p>
    </div>
  );
}

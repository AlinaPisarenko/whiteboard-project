import React from "react";

export default function EachProject({ project }) {
  const { id, title, description, whiteboard } = project;

  console.log(project);
  return (
    <div className="eachproject">
      <h4>{title}</h4>
      <p>{description}</p>
      <img src={whiteboard} />
    </div>
  );
}

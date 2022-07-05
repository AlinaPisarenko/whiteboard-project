import { useEffect, useState } from "react";
import EachProjectModal from "../EachProjectModal/EachProjectModal";
import SingleProject from "../SingleProject/SingleProject";

export default function Projects({ user }) {
  const [allProjects, setAllProjects] = useState();
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setAllProjects(data));
  }, []);

  const handleOpenProject = () => {
    setModal(!modal);
    console.log(modal);
  };

  if (!allProjects) return <p>loading...</p>;

  const mapProjects = allProjects.map((el) => {
    return (
      <>
        <SingleProject
          key={el.id}
          project={el}
          handleOpenProject={handleOpenProject}
          setSelectedProject={setSelectedProject}
        />
      </>
    );
  });

  return (
    <>
      {modal ? (
        <EachProjectModal
          modal={modal}
          setModal={setModal}
          user={user}
          allProjects={allProjects}
          selectedProject={selectedProject}
          setSelectedProject={selectedProject}
        />
      ) : (
        <div className="all-projects">{mapProjects}</div>
      )}
    </>
  );
}

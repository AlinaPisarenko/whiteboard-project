import { useEffect, useState } from "react";
import EachProjectModal from "../EachProjectModal/EachProjectModal";
import SingleProject from "../SingleProject/SingleProject";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

export default function Projects({ user, allUsers }) {
  const [allProjects, setAllProjects] = useState();
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState("");

  //fetching data on all projects
  useEffect(() => {
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => setAllProjects(data));
  }, []);

  //switching state to display modal
  const handleOpenProject = () => {
    setModal(!modal);
  };

  //getting value of search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (!allProjects) return <span className="loader"></span>;

  //filtering projects according to search input
  const filteredProjects = allProjects.filter((el) =>
    el.title.toLowerCase().includes(search.toLowerCase())
  );

  //mapping through all projects to return component for every project
  const mapProjects = filteredProjects.map((el) => {
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
  if (!allUsers) return "loading";
  return (
    <>
      <div className="login__form__group  all-prj-search">
        <input
          id="search"
          type="text"
          onChange={handleSearch}
          value={search}
          className="login__form__input search-bar__input"
          placeholder="Search"
        />
      </div>
      {modal ? (
        <EachProjectModal
          modal={modal}
          setModal={setModal}
          user={user}
          allProjects={allProjects}
          selectedProject={selectedProject}
          setSelectedProject={selectedProject}
        />
      ) : null}
      <div className="all-projects">{mapProjects}</div>

      <ProfileInfo user={user} allUsers={allUsers} />
    </>
  );
}

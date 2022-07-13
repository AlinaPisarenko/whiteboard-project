import { useEffect, useState } from "react";
import EachProjectModal from "../EachProjectModal/EachProjectModal";
import SingleProject from "../SingleProject/SingleProject";

export default function Projects({ user, allUsers }) {
  const [allProjects, setAllProjects] = useState();
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { id, name, profile_img } = user;

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
  if (!allUsers) return "loading";
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
      ) : null}
      <div className="all-projects">{mapProjects}</div>
      <div className="userinfo">
        <div className="current-user">
          <div className="image-container"></div>
          <img src={profile_img} className="profile-img" />
          <h2 className="user-name">{name}</h2>
        </div>
        <h2 className="all-users__team-info">Your Team</h2>
        <div className="all-users">
          {allUsers.map((el) => {
            return (
              <div className="each-user">
                <div className="each-user__img-wrap "></div>
                <img src={el.profile_img} className="each-user__profile-img" />
                <div className="each-user__info">
                  <h2 className="each-user__name"> {el.name}</h2>
                  <p className="each-user__project-count">
                    {" "}
                    Projects created: {el.projects.length}
                  </p>
                </div>

                {/* {displayScreen === "add-new" ? ( */}
                {/* <button
                  className="add-btn"
                  onClick={() => handleAddTeammate(el)}
                >
                  +
                </button> */}
                {/* ) : null} */}
              </div>
            );
          })}
          {/* <form onSubmit={handleCreateTeam} id="new-team-form">
            <input type="text" name="name" placeholder="Name your team"></input>
            <button>Create team</button>
          </form> */}
        </div>
      </div>
      <svg height="200" width="200">
        <clipPath id="blob">
          <path
            d="M 106 97 Q 121 106 121 126 L 120 160 Q 120 176 105 185 L 79 201 Q 60 213 40 200 L 15 184 Q 1 177 0 160 L -1 122 Q -1 105 14 96 L 40 80 Q 61 65 80 80 Z"
            transform="translate(15 -90) scale(1.25)"
          />
        </clipPath>
      </svg>
      <svg height="200" width="200">
        <clipPath id="blob-two">
          <path
            d="M 106 97 Q 121 106 121 126 L 120 160 Q 120 176 105 185 L 79 201 Q 60 213 40 200 L 15 184 Q 1 177 0 160 L -1 122 Q -1 105 14 96 L 40 80 Q 61 65 80 80 Z"
            transform="translate(15 -90) scale(1.25)"
          />
        </clipPath>
      </svg>
    </>
  );
}

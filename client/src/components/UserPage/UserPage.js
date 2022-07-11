import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EachProject from "../EachProject/EachProject";
import Whiteboard from "../Whiteboard/Whiteboard";

export default function UserPage({
  user,
  setUser,
  displayScreen,
  setDisplayedProject,
  allProjects,
  allUsers,
}) {
  const [projects, setProjects] = useState(user.projects);
  // const [allUsers, setAllUsers] = useState(null);
  const [team, setTeam] = useState([]);
  const history = useHistory();

  const { id, name, profile_img } = user;

  // useEffect(() => {
  //   fetch("/users")
  //     .then((r) => r.json())
  //     .then((data) => setAllUsers(data));
  // }, []);

  const mapProjects = projects.map((el) => {
    return (
      <EachProject
        key={el.id}
        project={el}
        setDisplayedProject={setDisplayedProject}
        onDeleteProject={onDeleteProject}
      />
    );
  });

  function onDeleteProject(id) {
    let projectsToDisplay = projects.filter((el) => el.id !== id);
    setProjects(projectsToDisplay);
  }

  // function handleAddTeammate(user) {
  //   setTeam([...team, user.id]);
  // }

  // const handleCreateTeam = async (e) => {
  //   e.preventDefault();
  //   let form = new FormData(document.querySelector(`#new-team-form`));
  //   form.append("members", team);

  //   let response = await fetch(`/teams`, {
  //     method: `POST`,
  //     body: form,
  //   });
  //   let newTeam = await response.json();
  //   console.log(newTeam);
  //   setTeam([]);
  // };

  const onAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  // const onUpdateProject = (updatedProject) => {
  //   console.log(updatedProject);
  // };

  if (!allUsers) return "loading";

  return (
    <div className="userpage">
      {displayScreen === "projects" ? (
        <div className="user-projects">
          {!projects ? "loading" : mapProjects}
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
            />
          </div>
        </>
      )}

      {displayScreen === "add-new" ? null : (
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
                  <img
                    src={el.profile_img}
                    className="each-user__profile-img"
                  />

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
      )}

      {/* <div className="all-users"></div> */}
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
    </div>
  );
}

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EachProject from "../EachProject/EachProject";
import Whiteboard from "../Whiteboard/Whiteboard";

export default function UserPage({ user, setUser, displayScreen }) {
  const [projects, setProjects] = useState(user.projects);
  const [allUsers, setAllUsers] = useState(null);
  const [team, setTeam] = useState([]);
  const history = useHistory();

  const { id, name, profile_img } = user;

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setAllUsers(data));
  }, []);

  const mapProjects = projects.map((el) => {
    return <EachProject key={el.id} project={el} />;
  });

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
            <Whiteboard user={user} team={team} onAddProject={onAddProject} />
          </div>
        </>
      )}

      {displayScreen === "add-new" ? null : (
        <div className="userinfo">
          <div className="current-user">
            <img src={profile_img} className="profile-img" />
            <h2 className="user-name">{name}</h2>
          </div>

          <div className="all-users">
            {allUsers.map((el) => {
              return (
                <div className="each-user">
                  <img src={el.profile_img} className="all-users-profile-img" />
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
    </div>
  );
}

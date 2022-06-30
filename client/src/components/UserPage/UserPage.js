import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EachProject from "../EachProject/EachProject";

export default function UserPage({ user, setUser }) {
  const [projects, setProjects] = useState(user.projects);
  const [allUsers, setAllUsers] = useState(null);
  const history = useHistory();

  const { id, name, profile_img } = user;
  console.log(user);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((data) => setAllUsers(data));
  }, []);

  const mapProjects = projects.map((el) => {
    return <EachProject key={el.id} project={el} />;
  });

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push(`/`);
      }
    });
  }
  if (!allUsers) return "loading";

  return (
    <div className="userpage">
      <div className="user-projects">{!projects ? "loading" : mapProjects}</div>
      <div className="userinfo">
        <h2>{name}</h2>
        <img src={profile_img} className="profile-img" />
        <div className="allUsers">
          {allUsers.map((el) => {
            return (
              <div>
                <img src={el.profile_img} className="all-users-profile-img" />
                <div> {el.name}</div>
                <button>+</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="all-users"></div>
      <a href="#" onClick={handleLogoutClick}>
        Log out
      </a>
    </div>
  );
}

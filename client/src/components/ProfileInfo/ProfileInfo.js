import React from "react";
import wrap from "./img-wrap.png";

export default function ProfileInfo({ allUsers, user }) {
  const { name, profile_img } = user;

  if (!allUsers) return <span class="loader"></span>;

  const filteredUsers = allUsers.filter((el) => el.team_id === user.team_id);

  return (
    <>
      <img src={wrap} className="img-wrap-thin" />
      <div className="userinfo">
        <div className="current-user">
          <div className="image-container"></div>
          <img src={profile_img} className="profile-img" />
          <h2 className="user-name">{name}</h2>
        </div>
        <div className="all-users__team-info">
          <h2>Your Team</h2>
          <h2>{user.team.name}</h2>
        </div>

        <div className="all-users">
          {filteredUsers.map((el) => {
            return (
              <div key={el.id} className="each-user">
                <div className="each-user__img-wrap "></div>
                <img src={el.profile_img} className="each-user__profile-img" />

                <div className="each-user__info">
                  <h2 className="each-user__name"> {el.name}</h2>
                  <p className="each-user__project-count">
                    {" "}
                    Projects created: {el.projects.length}
                  </p>
                </div>
              </div>
            );
          })}
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

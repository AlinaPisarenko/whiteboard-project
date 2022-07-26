import { useEffect, useState } from "react";
import Review from "../Review/Review";

export default function EachProjectModal({
  allProjects,
  selectedProject,
  setSelectedProject,
  user,
  setModal,
  modal,
}) {
  const { id, description, title, whiteboard } = selectedProject;
  const { name, profile_img, email } = selectedProject.user;
  const [allReviews, setAllReviews] = useState(selectedProject.reviews);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  //adding new review
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let reviewInput = document.querySelector(`#new-review-form-${id}`);
    let form = new FormData(reviewInput);
    form.append("user_id", user.id);
    form.append("project_id", id);

    let response = await fetch(`/reviews`, {
      method: `POST`,
      body: form,
    });
    if (response.ok) {
      let review = await response.json();
      setAllReviews((allReviews) => [...allReviews, review]);
      reviewInput.reset();
    } else {
      console.log(await response.json());
    }
  };

  //updating DOM after deleting review
  const handleDeleteReview = (rev) => {
    let reviewsToDisplay = allReviews.filter((review) => review.id !== rev.id);
    setAllReviews(reviewsToDisplay);
  };

  //changing state to display project info
  const handleClick = () => {
    setDisplayInfo(!displayInfo);
  };

  return (
    <div className={loading ? "project-modal" : "project-modal loading-m"}>
      <a onClick={() => setModal(!modal)} href="#" class="close-btn">
        &times;
      </a>

      <div className="container">
        <div id="front-card" className="card curr-img">
          <div className="main-info">
            <img src={whiteboard} className="curr-img__main-info__img"></img>

            <h2 className="curr-img__main-info__title">{title}</h2>
          </div>
          <h3 className="info-btn" onClick={handleClick}>
            {displayInfo === false ? "+" : "|"}
          </h3>
          <div
            className={
              displayInfo === false ? "no-show-modal" : "main-info-sub"
            }
          >
            <div className="main-info-sub__project-info">
              <div className="main-info-sub__project-info__user-info">
                <img
                  src={profile_img}
                  className="main-info-sub__project-info__user-info__img"
                ></img>
                <div>
                  <h2 className="main-info-sub__project-info__user-info__name">
                    {name}
                  </h2>
                  <p className="main-info-sub__project-info__user-info__email">
                    {email}
                  </p>
                </div>
              </div>
              <h2 className="main-info-sub__project-info__title">{title}</h2>
              <p className="main-info-sub__project-info__description">
                {description}
              </p>
            </div>

            <div className="main-info-sub__review">
              <h3 className="main-info-sub__review__text">Reviews</h3>
              <div className="main-info-sub__review__all">
                {allReviews.map((el) => {
                  return (
                    <Review
                      review={el}
                      user={user}
                      project={selectedProject}
                      onDelete={handleDeleteReview}
                    />
                  );
                })}
              </div>
              <form
                className="login__form add-review-form "
                id={`new-review-form-${id}`}
                onSubmit={handleFormSubmit}
              >
                <div className="login__form__group">
                  <input
                    className="login__form__input"
                    name="content"
                    type="text"
                    required=" "
                    id="add-review"
                  />
                  <label htmlFor="add-review" className="login__form__label">
                    Write a review
                  </label>
                </div>

                <div className="login__form__group">
                  <button className="btn login__btn-text" id="add-review-btn">
                    +
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

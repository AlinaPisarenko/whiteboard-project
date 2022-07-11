import { useState } from "react";
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
  const { name, profile_img } = selectedProject.user;
  const [index, setIndex] = useState(
    allProjects.findIndex((el) => {
      return el.id === id;
    })
  );
  const [currImg, setCurrImg] = useState(allProjects[index]);
  const [prevImg, setPrevImg] = useState(allProjects[index - 1]);
  const [nextImg, setNextImg] = useState(allProjects[index + 1]);
  const [allReviews, setAllReviews] = useState(allProjects[index].reviews);

  const handleClickNext = (e) => {
    e.preventDefault();
    console.log(index);
    console.log(allProjects.length);
    // if (index === allProjects.length - 2) {
    //   setCurrImg(allProjects[index + 1]);
    //   setNextImg(allProjects[0]);
    //   setPrevImg(allProjects[index]);
    //   setAllReviews(allProjects[index + 1].reviews);
    //   setIndex(0);
    // // } else if (index === 0) {
    //   setCurrImg(allProjects[index]);
    //   setNextImg(allProjects[index + 1]);
    //   setPrevImg(allProjects[allProjects.length - 1]);
    //   setAllReviews(allProjects[index].reviews);
    //   setIndex(index + 1);
    // } else {
    // let imageCurr = document.getElementById(`front-card`);

    // let imageNext = document.getElementById(`next-card`);

    // imageNext.className = "card curr-img";

    // let imageCurr = document.getElementById(`front-card`);
    // imageCurr.className = "card prev-img";

    // let imagePrev = document.getElementById(`prev-card`);
    // imagePrev.className = "card next-img";

    setCurrImg(allProjects[index + 1]);
    setAllReviews(allProjects[index + 1].reviews);
    setPrevImg(allProjects[index]);
    setNextImg(allProjects[index + 2]);

    setIndex(index + 1);
    // }

    // imageCurr.id = "prev-card";
    // imagePrev.id = "next-card";
    // imageNext.id = "front-card";
  };

  const handleClickPrev = (e) => {
    // e.preventDefault();

    // if (index === 2) {
    //   setCurrImg(allProjects[index - 1]);
    //   setNextImg(allProjects[index]);
    //   setPrevImg(allProjects[allProjects.length - 1]);
    //   setAllReviews(allProjects[index - 1].reviews);
    //   setIndex(allProjects.length - 1);
    // } else {
    setCurrImg(allProjects[index - 1]);
    setNextImg(allProjects[index]);
    setPrevImg(allProjects[index - 2]);
    setAllReviews(allProjects[index - 1].reviews);
    //   setIndex(index - 1);
    // }

    // let image = document.getElementById(`front-card`);
    // image.className = "card prev-img";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let reviewInput = document.querySelector(`#new-review-form-${currImg.id}`);
    let form = new FormData(reviewInput);
    form.append("user_id", user.id);
    form.append("project_id", currImg.id);

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

  const handleDeleteReview = (rev) => {
    let reviewsToDisplay = allReviews.filter((review) => review.id !== rev.id);
    setAllReviews(reviewsToDisplay);
  };

  return (
    <div className="project-modal">
      <a onClick={() => setModal(!modal)} href="#" class="close-btn">
        &times;
      </a>
      {/* <button onClick={handleClickNext}>work please</button> */}

      <div className="container">
        <div id="prev-card" className="card prev-img" onClick={handleClickPrev}>
          <img src={prevImg.whiteboard} className="prev-img__img"></img>
          <h2>{prevImg.title}</h2>
        </div>

        <div id="front-card" className="card curr-img">
          <div className="curr-img__project-info">
            <img
              src={currImg.whiteboard}
              className="curr-img__project-info__img"
            ></img>

            <h2 className="curr-img__project-info__title">{currImg.title}</h2>
            <p className="curr-img__project-info__description">
              {currImg.description}
            </p>
          </div>

          <div className="curr-img__review">
            <div className="curr-img__review__user-info">
              <img
                src={currImg.user.profile_img}
                className="curr-img__review__img"
              ></img>
              <div>
                <h2 className="curr-img__review__user">{currImg.user.name}</h2>
                <p className="curr-img__review__email">{currImg.user.email}</p>
              </div>
            </div>

            <div className="curr-img__review__all">
              {allReviews.map((el) => {
                return (
                  <Review
                    review={el}
                    user={user}
                    project={currImg}
                    onDelete={handleDeleteReview}
                  />
                );
              })}
            </div>
            <form
              classname="curr-img__review__form"
              id={`new-review-form-${currImg.id}`}
              onSubmit={handleFormSubmit}
            >
              <input
                classname="curr-img__review__form__input"
                name="content"
                type="text"
                placeholder="Write a review"
              />
              <button classname="curr-img__review__btn">Post</button>
            </form>
          </div>
        </div>
        <button onClick={handleClickNext}>please work</button>
        <div id="next-card" className="card next-img" onClick={handleClickNext}>
          <img src={nextImg.whiteboard} className="next-img__img"></img>
          <h2>{nextImg.title}</h2>
        </div>
      </div>
    </div>
  );
}

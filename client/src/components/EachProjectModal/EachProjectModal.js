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
  const { name, profile_img } = selectedProject.user;
  const [index, setIndex] = useState(
    allProjects.findIndex((el) => {
      return el.id === id;
    })
  );
  const [currImg, setCurrImg] = useState(allProjects[index]);
  // const [prevImg, setPrevImg] = useState(allProjects[index - 1]);
  // const [nextImg, setNextImg] = useState(allProjects[index + 1]);
  const [allReviews, setAllReviews] = useState(allProjects[index].reviews);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(allReviews);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  // const handleClickNext = (e) => {
  //   e.preventDefault();
  //   console.log(index);
  //   console.log(allProjects.length);

  //   setCurrImg(allProjects[index + 1]);
  //   setAllReviews(allProjects[index + 1].reviews);
  //   setPrevImg(allProjects[index]);
  //   setNextImg(allProjects[index + 2]);
  //   setIndex(index + 1);
  //   // if (index === allProjects.length - 2) {
  //   //   setCurrImg(allProjects[index + 1]);
  //   //   setNextImg(allProjects[0]);
  //   //   setPrevImg(allProjects[index]);
  //   //   setAllReviews(allProjects[index + 1].reviews);
  //   //   setIndex(0);
  //   // // } else if (index === 0) {
  //   //   setCurrImg(allProjects[index]);
  //   //   setNextImg(allProjects[index + 1]);
  //   //   setPrevImg(allProjects[allProjects.length - 1]);
  //   //   setAllReviews(allProjects[index].reviews);
  //   //   setIndex(index + 1);
  //   // } else {
  //   // let imageCurr = document.getElementById(`front-card`);

  //   // el.classList.toggle("moved");
  //   // let imageNext = document.getElementById(`next-card`);

  //   // imageNext.className = "card curr-img";

  //   // let imageCurr = document.getElementById(`front-card`);
  //   // imageCurr.className = "card prev-img";

  //   // let imagePrev = document.getElementById(`prev-card`);
  //   // imagePrev.className = "card next-img";

  //   // el.classList.toggle("moved");

  //   // }

  //   // imageCurr.id = "prev-card";
  //   // imagePrev.id = "next-card";
  //   // imageNext.id = "front-card";
  // };

  // const handleClickPrev = (e) => {
  //   // e.preventDefault();

  //   // if (index === 2) {
  //   //   setCurrImg(allProjects[index - 1]);
  //   //   setNextImg(allProjects[index]);
  //   //   setPrevImg(allProjects[allProjects.length - 1]);
  //   //   setAllReviews(allProjects[index - 1].reviews);
  //   //   setIndex(allProjects.length - 1);
  //   // } else {
  //   setCurrImg(allProjects[index - 1]);
  //   setNextImg(allProjects[index]);
  //   setPrevImg(allProjects[index - 2]);
  //   setAllReviews(allProjects[index - 1].reviews);
  //   //   setIndex(index - 1);
  //   // }

  //   // let image = document.getElementById(`front-card`);
  //   // image.className = "card prev-img";
  // };

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

  const handleClick = () => {
    setDisplayInfo(!displayInfo);
  };

  return (
    <div className={loading ? "project-modal" : "project-modal loading-m"}>
      <a onClick={() => setModal(!modal)} href="#" class="close-btn">
        &times;
      </a>
      {/* <button onClick={handleClickNext}>work please</button> */}

      <div className="container">
        {/* <input type="radio" name="slider" id="item-1" checked></input>
        <input type="radio" name="slider" id="item-2"></input>
        <input type="radio" name="slider" id="item-3"></input> */}
        {/* <div class="cards"> */}
        {/* <label class="each-card" for="item-2" id="song-2"> */}
        {/* <div
            id="prev-card"
            className="card prev-img"
            onClick={handleClickPrev}
          >
            <img src={prevImg.whiteboard} className="prev-img__img"></img>
            <h2>{prevImg.title}</h2>
          </div> */}
        {/* </label> */}

        {/* <label class="each-card" for="item-1" id="song-1"> */}
        <div id="front-card" className="card curr-img">
          {/* <input
            type="checkbox"
            class="front-card__checkbox"
            id="navi-toggle"
          />
          <label for="navi-toggle" class="navigation__button">
            <span class="navigation__icon">&nbsp;</span>
          </label> */}
          <div className="main-info">
            <img
              src={currImg.whiteboard}
              className="curr-img__main-info__img"
            ></img>

            <h2 className="curr-img__main-info__title">{currImg.title}</h2>
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
                  src={currImg.user.profile_img}
                  className="main-info-sub__project-info__user-info__img"
                ></img>
                <div>
                  <h2 className="main-info-sub__project-info__user-info__name">
                    {currImg.user.name}
                  </h2>
                  <p className="main-info-sub__project-info__user-info__email">
                    {currImg.user.email}
                  </p>
                </div>
              </div>
              <h2 className="main-info-sub__project-info__title">
                {currImg.title}
              </h2>
              <p className="main-info-sub__project-info__description">
                {currImg.description}
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
                      project={currImg}
                      onDelete={handleDeleteReview}
                    />
                  );
                })}
              </div>
              <form
                className="login__form add-review-form "
                id={`new-review-form-${currImg.id}`}
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
        {/* </label> */}
        {/* <label class="each-card" for="item-3" id="song-3"> */}
        {/* <div
            id="next-card"
            className="card next-img"
            onClick={handleClickNext}
          >
            <img src={nextImg.whiteboard} className="next-img__img"></img>
            <h2>{nextImg.title}</h2>
          </div> */}
        {/* </label> */}
        {/* </div> */}
      </div>
    </div>
  );
}

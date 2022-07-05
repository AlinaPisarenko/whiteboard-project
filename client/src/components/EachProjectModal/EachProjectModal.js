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
    // e.preventDefault();

    // if (CurrImg === allProjects.length-1) {
    //      setCurrImg(allProjects[index + 1]);
    //      setNextImg(allProjects[0]);
    //      setPrevImg(allProjects[index]);
    //      setAllReviews(allProjects[index + 1].reviews);
    //      setIndex(0);
    // }

    setCurrImg(allProjects[index + 1]);
    setNextImg(allProjects[index + 2]);
    setPrevImg(allProjects[index]);
    setAllReviews(allProjects[index + 1].reviews);
    setIndex(index + 1);
  };

  const handleClickPrev = (e) => {
    // e.preventDefault();

    // if (CurrImg) {
    //   setCurrImg(allProjects[index + 1]);
    //   setNextImg(allProjects[allProjects.length - 1]);
    //   setPrevImg(allProjects[index]);
    //   setAllReviews(allProjects[index + 1].reviews);
    //   setIndex(allProjects.length - 1);
    // }

    setCurrImg(allProjects[index - 1]);
    setNextImg(allProjects[index]);
    setPrevImg(allProjects[index - 2]);
    setAllReviews(allProjects[index - 1].reviews);
    setIndex(index - 1);
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
      console.log(review);
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
      <div className="container">
        <div className="card prev-img" onClick={handleClickPrev}>
          <img src={prevImg.whiteboard} className="project-img-modal"></img>
          <h2>{prevImg.title}</h2>
          <div className="review">
            {/* <Review user={user} project={prevImg} /> */}
          </div>
        </div>
        <div className="card curr-img">
          <img src={currImg.whiteboard} className="project-img-modal"></img>
          <h2>{currImg.title}</h2>
          <div className="review">
            <form
              id={`new-review-form-${currImg.id}`}
              onSubmit={handleFormSubmit}
            >
              <input name="content" type="text" placeholder="Write a review" />
              <button>Post</button>
            </form>
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
        </div>

        <div className="card next-img" onClick={handleClickNext}>
          <img src={nextImg.whiteboard} className="project-img-modal"></img>
          <h2>{nextImg.title}</h2>
          <div className="review">
            {/* <Review user={user} project={nextImg} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

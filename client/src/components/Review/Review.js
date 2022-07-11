import { useState } from "react";

export default function Review({
  project,
  user,
  onAddReview,
  review,
  onDelete,
}) {
  const { name, profile_img } = project.user;

  const handleDelete = () => {
    fetch(`/reviews/${review?.id}`, { method: "DELETE" });
    onDelete(review);
  };

  return (
    <>
      <div className="each-review">
        <img
          className="each-review__img"
          src={review?.image_url}
          alt="user-img"
        />
        <div>
          <h3 className="each-review__user">{review?.name}</h3>
          <p className="each-review__content">{review?.content}</p>
        </div>
        <button className="each-review__btn" onClick={handleDelete}>
          {" "}
          &times;
        </button>
      </div>
    </>
  );
}

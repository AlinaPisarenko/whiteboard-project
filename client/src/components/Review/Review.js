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
    fetch(`/reviews/${review.id}`, { method: "DELETE" });
    onDelete(review);
  };

  console.log(review);
  return (
    <>
      <div>
        <img className="review-img" src={review.image_url} alt="user-img" />
        <div>
          <h3>{review.name}</h3>
          <p>{review.content}</p>
        </div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

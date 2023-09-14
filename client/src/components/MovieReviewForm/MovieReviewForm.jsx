import React, { useState } from "react";
import style from "./style.module.scss";
import { useUser } from "../../UserContext";

const MovieReviewForm = ({ movieId, userId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useUser();
  userId = "64fd959809e3c1f3d63e05de"; // need to change this

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      movieId,
      userId,
      rating: parseInt(rating),
      comment,
    };
    console.log(newReview);
    onReviewSubmit(newReview);
    setRating(0);
    setComment("");
  };

  return (
    <div className={style.reviewForm}>
      <h3>Add a Review</h3>
      {user ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            min="1"
            max="5"
            onChange={handleRatingChange}
            required
          />
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <h4>Login to review!</h4>
      )}
    </div>
  );
};

export default MovieReviewForm;

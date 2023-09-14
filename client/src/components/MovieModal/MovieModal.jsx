import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import style from "./style.module.scss";
import MovieReviewForm from "../MovieReviewForm/MovieReviewForm";
import MovieReviewSection from "../MovieReviewSection/MovieReviewSection";

const MovieModal = ({ isOpen, onClose, trailerLink, movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (isOpen && movieId) {
      if (movieId) {
        fetch(`http://localhost:4050/api/movies/${movieId}/review`)
          .then((response) => response.json())
          .then((data) => {
            setReviews(data);
          })
          .catch((error) => console.error("Error fetching reviews:", error));
      }
    }
  }, [isOpen, movieId]);

  if (!isOpen) {
    return null;
  }

  const handleReviewSubmit = (review) => {
    fetch(`http://localhost:4050/api/movies/${movieId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        console.log("Updated list of reviews", data);
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  return (
    <div className={style.modalBackdrop} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          Close
        </button>

        <ReactPlayer
          className={style.react__player}
          url={trailerLink}
          controls={true}
          width="100%"
          height="100%"
        />
        <MovieReviewSection reviews={reviews} />
        <MovieReviewForm
          movieId={movieId}
          userId="currentUserId"
          onReviewSubmit={handleReviewSubmit}
        />
      </div>
    </div>
  );
};

export default MovieModal;

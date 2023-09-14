import React, { useState, useEffect } from "react";
import MovieActions from "../MovieActions/MovieActions";

import style from "./style.module.scss";

const MovieCard = ({
  name,
  releaseDate,
  genres,
  poster,
  onClick,
  movieId,
  onDelete,
}) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4050/api/movies/${movieId}/review`)
      .then((response) => response.json())
      .then((data) => {
        const totalRating = data.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating = data.length > 0 ? totalRating / data.length : null;
        setAverageRating(avgRating);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [movieId]);

  const handleCardClick = () => {
    onClick();
  };

  const handleEditClick = () => {
    // Handle the edit action here
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:4050/api/movies/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(movieId);
        }
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <div
      className={style.movieCard}
      style={{
        backgroundImage: `url(${poster})`,
      }}
    >
      <div className={style.poster} onClick={handleCardClick}>
        <div className={style.overlay}></div>
        <h3 className={style.name}>{name}</h3>
      </div>
      <div className={style.info}>
        <p className={style.releaseDate}>Release Date: {releaseDate}</p>
        {averageRating !== null ? (
          <p className={style.rating}>
            Rating: {averageRating.toFixed(1)} stars
          </p>
        ) : (
          <p className={style.rating}>Rating: N/A</p>
        )}
        <p className={style.genres}>Genres: {genres.join(", ")}</p>
      </div>

      <MovieActions
        movieId={movieId}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default MovieCard;

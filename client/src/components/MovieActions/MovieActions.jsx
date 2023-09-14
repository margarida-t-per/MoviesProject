import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const MovieActions = ({ onDelete, movieId }) => {
  const handleDeleteClick = () => {
    onDelete(movieId);
  };
  return (
    <div className={style.movieActions}>
      <Link to={`/editmovie/${movieId}`} className={style.editButton}>
        Edit
      </Link>
      <button className={style.deleteButton} onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default MovieActions;

import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";

const MovieActions = ({ onDelete, movieId }) => {
  const { user } = useUser();
  const handleDeleteClick = () => {
    onDelete(movieId);
  };

  const isAdmin = user && user.user.roles[0] === "64fd872c0d7b594f26bd9592";

  return (
    <>
      {isAdmin && (
        <div className={style.movieActions}>
          <Link to={`/editmovie/${movieId}`} className={style.editButton}>
            Edit
          </Link>
          <button className={style.deleteButton} onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default MovieActions;

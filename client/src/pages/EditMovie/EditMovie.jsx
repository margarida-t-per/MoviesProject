import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import EditMovieForm from "../../components/adminOnly/EditMovieForm/EditMovieForm.jsx";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4050/api/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedDate = new Date(data.releaseDate)
          .toISOString()
          .split("T")[0];
        setMovieData({
          ...data,
          releaseDate: formattedDate,
        });
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [movieId]);

  const handleUpdate = () => {
    navigate("/");
  };

  return (
    <div className={style.main__container}>
      {movieData ? (
        <EditMovieForm
          movieData={movieData}
          movieId={movieId}
          onUpdate={handleUpdate}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditMovie;

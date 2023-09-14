import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";
import style from "./style.module.scss";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4050/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleCardClick = (trailerLink, movieId) => {
    setSelectedMovie({ trailerLink, movieId });
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleDeleteMovie = (movieId) => {
    fetch(`http://localhost:4050/api/movies/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedMovies = movies.filter((movie) => movie._id !== movieId);
          setMovies(updatedMovies);
        }
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <div className={style.moviesList}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie._id}
            name={movie.title}
            releaseDate={new Date(movie.releaseDate).toLocaleDateString()}
            genres={movie.genres}
            poster={movie.posterUrl}
            onClick={() => handleCardClick(movie.trailerLink, movie._id)}
            movieId={movie._id}
            onDelete={handleDeleteMovie}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}

      <MovieModal
        isOpen={selectedMovie !== null}
        onClose={handleCloseModal}
        trailerLink={selectedMovie ? selectedMovie.trailerLink : ""}
        movieId={selectedMovie ? selectedMovie.movieId : ""}
      />
    </div>
  );
};

export default MoviesList;

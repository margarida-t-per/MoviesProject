import React, { useState, useEffect } from "react";
import style from "./style.module.scss";

const EditMovieForm = ({ movieData, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    trailerLink: "",
    posterUrl: null,
    genres: [],
  });

  useEffect(() => {
    setFormData({
      title: movieData.title,
      releaseDate: movieData.releaseDate,
      trailerLink: movieData.trailerLink,
      posterUrl: null,
      genres: movieData.genres,
    });
  }, [movieData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "genres") {
      const genresArray = value.split(",").map((genre) => genre.trim());
      setFormData({
        ...formData,
        genres: genresArray,
      });
    } else if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const accessToken = user.accessToken;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    try {
      const formDataForSubmission = new FormData();
      formDataForSubmission.append("title", formData.title);
      formDataForSubmission.append("releaseDate", formData.releaseDate);
      formDataForSubmission.append("trailerLink", formData.trailerLink);
      formDataForSubmission.append("genres", formData.genres.join(", "));
      formDataForSubmission.append("posterUrl", formData.posterUrl);

      const response = await fetch(
        `http://localhost:4050/api/movies/${movieData._id}`,
        {
          method: "PUT",
          headers,
          body: formDataForSubmission,
        }
      );

      if (response.ok) {
        console.log("Movie updated successfully");
        onUpdate();
      } else {
        console.error("Failed to update movie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.editForm}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
        />
        <label htmlFor="trailerLink">Trailer Link:</label>
        <input
          type="text"
          id="trailerLink"
          name="trailerLink"
          value={formData.trailerLink}
          onChange={handleChange}
        />
        <label htmlFor="posterUrl">Poster:</label>
        <input
          type="file"
          id="posterUrl"
          name="posterUrl"
          onChange={handleChange}
        />
        <label htmlFor="genres">Genres:</label>
        <input
          type="text"
          id="genres"
          name="genres"
          value={formData.genres.join(", ")}
          onChange={handleChange}
        />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovieForm;

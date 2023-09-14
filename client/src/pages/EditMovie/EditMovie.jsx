import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import EditMovieForm from "../../components/adminOnly/EditMovieForm/EditMovieForm.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserRole() {
      try {
        const userRoles = user && user.user.roles[0];
        if (userRoles === "64fd872c0d7b594f26bd9592") {
          console.log("yes");
          setIsAdmin(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    console.log(isAdmin);
    checkUserRole();
  }, [user]);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/");
    }
  }, [isLoading, isAdmin, navigate]);

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
    <>
      {isAdmin && (
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
      )}
    </>
  );
};

export default EditMovie;

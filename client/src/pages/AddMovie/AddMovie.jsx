import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import AddMovieForm from "../../components/adminOnly/AddMovieForm/AddMovieForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

const AddMovie = () => {
  const navigate = useNavigate();
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

  const handleAddition = () => {
    navigate("/");
  };

  return (
    <>
      {isAdmin && (
        <div className={style.main__container}>
          <AddMovieForm onAdd={handleAddition}></AddMovieForm>
        </div>
      )}
    </>
  );
};

export default AddMovie;

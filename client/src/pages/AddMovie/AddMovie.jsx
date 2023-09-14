import style from "./style.module.scss";
import AddMovieForm from "../../components/adminOnly/AddMovieForm/AddMovieForm";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  const handleAddition = () => {
    navigate("/");
  };

  return (
    <div className={style.main__container}>
      <AddMovieForm onAdd={handleAddition}></AddMovieForm>
    </div>
  );
};

export default AddMovie;

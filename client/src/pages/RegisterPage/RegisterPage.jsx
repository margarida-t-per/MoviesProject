import style from "./style.module.scss";
import Register from "../../components/Register/Register";

const RegisterPage = () => {
  return (
    <div className={style.main__container}>
      <Register />
    </div>
  );
};
export default RegisterPage;

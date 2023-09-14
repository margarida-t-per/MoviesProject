import style from "./style.module.scss";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  return (
    <div className={style.main__container}>
      <Login />
    </div>
  );
};
export default LoginPage;

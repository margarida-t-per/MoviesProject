import style from "./style.module.scss";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import { useUser } from "../../UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <div className={style.navbar__container}>
      <Logo href={"/"}></Logo>
      <Menu user={user} logout={logout}></Menu>
    </div>
  );
};

export default Navbar;

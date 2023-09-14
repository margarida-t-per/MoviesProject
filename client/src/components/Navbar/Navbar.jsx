import style from "./style.module.scss";

import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";

const Navbar = () => {
  return (
    <div className={style.navbar__container}>
      <Logo href={"/"}></Logo>
      <Menu></Menu>
    </div>
  );
};

export default Navbar;

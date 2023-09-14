import style from "./style.module.scss";
import MenuItem from "../MenuItem/MenuItem";

const Menu = ({ user }) => {
  const isAdmin = user && user.user.roles[0] === "64fd872c0d7b594f26bd9592";

  return (
    <div className={style.menu}>
      <MenuItem text="Home" href="/" />

      {isAdmin && <MenuItem text="Add Movie" href="/addmovie" />}
      {user ? (
        <MenuItem text="Logout" href="/logout" />
      ) : (
        <MenuItem text="Login" href="/login" />
      )}
    </div>
  );
};

export default Menu;

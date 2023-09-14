import style from "./style.module.scss";
import MenuItem from "../MenuItem/MenuItem";

const menuItems = [
  { text: "Home", href: "/" },
  { text: "Add Movie", href: "/addmovie" },
];

const Menu = ({ user }) => {
  return (
    <div className={style.menu}>
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index} text={menuItem.text} href={menuItem.href} />
      ))}
      {user ? (
        <MenuItem text="Logout" href="/logout" />
      ) : (
        <MenuItem text="Login" href="/login" />
      )}
    </div>
  );
};

export default Menu;

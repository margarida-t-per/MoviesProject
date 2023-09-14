import style from "./style.module.scss";
import MenuItem from "../MenuItem/MenuItem";

const menuItems = [
  { text: "Home", href: "/" },
  { text: "Login", href: "/login" },
  { text: "Add Movie", href: "/addmovie" },
];

const Menu = () => {
  return (
    <div className={style.menu}>
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index} text={menuItem.text} href={menuItem.href} />
      ))}
    </div>
  );
};

export default Menu;

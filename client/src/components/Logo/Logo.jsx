import style from "./style.module.scss";
import { Link } from "react-router-dom";

const Logo = ({ href }) => {
  return (
    <Link to={href} className={style.text}>
      <h3>
        Movies<span className={style.to__red}>Edit</span>
      </h3>
    </Link>
  );
};

export default Logo;

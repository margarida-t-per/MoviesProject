import { Link } from "react-router-dom";

const MenuItem = ({ text, href }) => {
  return <Link to={href}>{text}</Link>
};

export default MenuItem;

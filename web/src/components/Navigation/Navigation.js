import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link to={"login"}>Login</Link>
        </li>
        <li>
          <Link to={"profile"}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

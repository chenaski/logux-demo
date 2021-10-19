import classes from "./Layout.module.css";
import { Navigation } from "../Navigation/Navigation";
import React from "react";

export const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Navigation />
      {children}
    </div>
  );
};

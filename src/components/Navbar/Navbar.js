import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.Active : null)}
      >
        Home
      </NavLink>

      <NavLink
        to="/update-profile"
        className={({ isActive }) => (isActive ? classes.Active : null)}
      >
        Update Profile
      </NavLink>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
};
export default Navbar;

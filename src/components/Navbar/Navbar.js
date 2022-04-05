import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <Link to="/">Home</Link>
      <Link to="/new-orders">New Orders</Link>
      <Link to="/accepted-orders">Accepted Orders</Link>
      <Link to="/delivered-orders">Delivered Orders</Link>
      <button onClick={props.logoutClick}>Logout</button>
    </div>
  );
};
export default Navbar;

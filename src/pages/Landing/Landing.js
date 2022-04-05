import React from "react";
import classes from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <div className={classes.Landing}>
      <h1>Welcome to YummyBay Delivery Partners!</h1>
      <Link to="/login">Login Here</Link>
    </div>
  );
};
export default Landing;

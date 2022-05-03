import React from "react";
import classes from "./Dashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";
const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      <h1>Dashboard</h1>
      <div className={classes.Container}>
        <div className={classes.Links}>
          <NavLink
            to="/new-orders"
            className={({ isActive }) => (isActive ? classes.Active : null)}
          >
            New Orders
          </NavLink>
          <NavLink
            to="/accepted-orders"
            className={({ isActive }) => (isActive ? classes.Active : null)}
          >
            Accepted Orders
          </NavLink>
          <NavLink
            to="/delivered-orders"
            className={({ isActive }) => (isActive ? classes.Active : null)}
          >
            Delivered Orders
          </NavLink>
        </div>
        <div className={classes.Orders}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

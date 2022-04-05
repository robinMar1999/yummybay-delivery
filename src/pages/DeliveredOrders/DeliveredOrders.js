import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./DeliveredOrders.module.css";
const DeliveredOrders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/delivery/get-delivered",
      headers: {
        Authorization: props.token,
      },
    }).then((res) => {
      console.log(res);
      setOrders(res.data.orders);
    });
  }, []);
  const ordersList = [];
  orders.forEach((order) => {
    ordersList.push(
      <div key={order._id} className={classes.order}>
        <div>{order._id}</div>
        <div>₹ {order.totalPrice}</div>
      </div>
    );
  });
  return (
    <div className={classes.DeliveredOrders}>
      <h1>Delivered Orders</h1>
      <div className={classes.orders}>{ordersList}</div>
    </div>
  );
};
export default DeliveredOrders;

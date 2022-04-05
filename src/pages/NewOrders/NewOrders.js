import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "./NewOrders.module.css";

const NewOrders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/delivery/new-orders",
      headers: {
        Authorization: props.token,
      },
    }).then((res) => {
      console.log(res.data.orders);
      setOrders(res.data.orders);
    });
  }, []);

  const getOrderHandler = (orderId) => {
    axios({
      method: "post",
      url: "/delivery/get-order/" + orderId,
      headers: {
        Authorization: props.token,
      },
    }).then((res) => {
      console.log(res.data);
      setOrders((prevOrders) => {
        const newOrders = [];
        prevOrders.forEach((order) => {
          if (order._id !== res.data.order._id) {
            newOrders.push(order);
          }
        });
        return newOrders;
      });
    });
  };

  const ordersList = [];
  orders.forEach((order) => {
    ordersList.push(
      <div className={classes.order} key={order._id}>
        <div>{order._id}</div>
        <button onClick={() => getOrderHandler(order._id)}>Get</button>
      </div>
    );
  });
  return (
    <div className={classes.NewOrders}>
      <h1>New Orders</h1>
      <div className={classes.orders}>{ordersList}</div>
    </div>
  );
};
export default NewOrders;

import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./AcceptedOrders.module.css";
const AcceptedOrders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAcceptedOrders();
    // const x = setInterval(() => {
    //   getAcceptedOrders();
    // }, 5 * 1000);
    // return () => {
    //   clearInterval(x);
    // };
  }, []);

  const getAcceptedOrders = () => {
    axios({
      method: "get",
      url: "/delivery/get-accepted",
      headers: {
        Authorization: props.token,
      },
    }).then((res) => {
      console.log(res);
      setOrders(res.data.orders);
    });
  };

  const deliverOrderHandler = (orderId) => {
    axios({
      method: "patch",
      url: "/delivery/deliver/" + orderId,
      headers: {
        Authorization: props.token,
      },
    }).then((res) => {
      console.log(res);
      setOrders((prevOrders) => {
        const newOrders = [];
        prevOrders.forEach((order) => {
          if (order._id !== orderId) {
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
      <div key={order._id}>
        <div>{order._id}</div>
        <button
          disabled={order.status !== 1}
          onClick={() => {
            deliverOrderHandler(order._id);
          }}
        >
          {order.status === 0 && "Not Handed Yet"}
          {order.status === 1 && "Deliver"}
        </button>
      </div>
    );
  });
  return (
    <div className={classes.AcceptedOrders}>
      <h1>Accepted Orders</h1>
      <div className={classes.orders}>{ordersList}</div>
    </div>
  );
};
export default AcceptedOrders;

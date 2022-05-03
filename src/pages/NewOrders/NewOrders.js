import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "./NewOrders.module.css";
import OrderItems from "../../components/OrderItems/OrderItems";

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

  useEffect(() => {
    if (props.socket) {
      props.socket.on("new-order", (order) => {
        console.log("Adding New Order...");
        addNewOrder(order);
      });
      props.socket.on("order-aquired", (order) => {
        console.log(order);
        removeOrder(order);
      });
    }
  }, [props.socket]);

  const addNewOrder = (order) => {
    setOrders((prevOrders) => {
      let orderFound = false;
      for (let o of prevOrders) {
        if (o._id === order.id) {
          orderFound = true;
        }
      }
      if (orderFound) {
        return prevOrders;
      } else {
        return [...prevOrders, order];
      }
    });
  };

  const removeOrder = (removedOrder) => {
    setOrders((prevOrders) => {
      const newOrders = [];
      for (let order of prevOrders) {
        if (order._id !== removedOrder._id) {
          newOrders.push(order);
        }
      }
      return newOrders;
    });
  };

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
  return <OrderItems orders={orders} onClick={getOrderHandler} />;
};
export default NewOrders;

import React from "react";
import classes from "./OrderItems.module.css";
import OrderItem from "./OrderItem/OrderItem";
const OrderItems = (props) => {
  console.log(props.orders);
  const orderList = [];
  props.orders.forEach((order) => {
    orderList.push(
      <OrderItem order={order} key={order._id}>
        {!order.deliveryId && order.status === 0 && (
          <button
            onClick={() => props.onClick(order._id)}
            className={classes.Button}
          >
            Accept Order
          </button>
        )}
        {order.deliveryId && order.status === 0 && (
          <button
            disabled
            onClick={() => props.onClick(order._id)}
            className={classes.Button}
          >
            Not Handed Yet
          </button>
        )}
        {order.deliveryId && order.status === 1 && (
          <button
            onClick={() => props.onClick(order._id)}
            className={classes.Button}
          >
            Deliver
          </button>
        )}
      </OrderItem>
    );
  });
  return <div className={classes.OrderItems}>{orderList}</div>;
};
export default OrderItems;

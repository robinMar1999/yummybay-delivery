import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItems from "../../components/OrderItems/OrderItems";
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

  return <OrderItems orders={orders} />;
};
export default DeliveredOrders;

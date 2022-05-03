import React, { Fragment, useState } from "react";
import classes from "./OrderItem.module.css";
import Modal from "../../UI/Modal/Modal";

const OrderItem = (props) => {
  const order = props.order;
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const showOrderContent = showModal ? (
    <Modal closeModal={toggleModal}>
      <div className={classes.Dishes}>
        {order.dishes.map((item) => {
          return (
            <div className={classes.Dish} key={item._id}>
              <div className={classes.Count}>{item.count}</div>
              <div className={classes.X}>X</div>
              <div className={classes.DishDetail}>
                <div className={classes.DishName}>{item.dish.name}</div>

                <div className={classes.DishImage}>
                  <img src={item.dish.imageDetails.url} alt={item.dish.name} />
                </div>
                <div className={classes.DishPrice}>₹ {item.dish.price}</div>
                <div className={classes.DishTotal}>
                  = ₹ {item.count * item.dish.price}
                </div>
              </div>
            </div>
          );
        })}
        <div className={classes.TotalPrice}>
          Total Price : ₹ {order.totalPrice}
        </div>
      </div>
    </Modal>
  ) : null;

  return (
    <Fragment>
      {showOrderContent}
      <div className={classes.OrderItem}>
        <div>
          <div className={classes.OrderId}>Order ID: {order._id}</div>
          <a
            href={`https://www.google.com/maps/?q=${order.restaurant.latitude},${order.restaurant.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Restaurant Location
          </a>
          <a
            href={`https://www.google.com/maps/?q=${order.restaurant.latitude},${order.restaurant.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Customer Location
          </a>
          <button className={classes.OrderDetails} onClick={toggleModal}>
            See Order Details
          </button>
        </div>
        <div className={classes.Buttons}>{props.children}</div>
      </div>
    </Fragment>
  );
};
export default OrderItem;

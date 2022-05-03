import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./UpdateProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = (props) => {
  const nameRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const data = new FormData();
    data.append("name", name);
    data.append("phone", phone);

    axios({
      method: "put",
      url: "/delivery/profile",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <div className={classes.UpdateProfile}>
      <h1>Create Your Profile</h1>
      <form onSubmit={formSubmitHandler} className={classes.Form}>
        {isAdding && <div className={classes.isAdding}>Adding Profile...</div>}
        <div className={classes.FormControl}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            ref={phoneRef}
          />
        </div>

        <div className={classes.FormControl}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UpdateProfile;

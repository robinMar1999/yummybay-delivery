import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./AddProfile.module.css";
import axios from "axios";

const AddProfile = (props) => {
  const nameRef = useRef();
  const phoneRef = useRef();

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
      method: "post",
      url: "/delivery/profile",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        props.setIsProfileAdded(true);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <div className={classes.AddProfile}>
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
export default AddProfile;

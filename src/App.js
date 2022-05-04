import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NewOrders from "./pages/NewOrders/NewOrders";
import AcceptedOrders from "./pages/AcceptedOrders/AcceptedOrders";
import DeliveredOrders from "./pages/DeliveredOrders/DeliveredOrders";
import { io } from "socket.io-client";
import AddProfile from "./pages/AddProfile/AddProfile";
import Warning from "./components/UI/Warning/Warning";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";

function App() {
  const [isProfileAdded, setIsProfileAdded] = useState(() => {
    const isProfileAdded = localStorage.getItem("isProfileAdded");
    console.log(isProfileAdded);
    return !isProfileAdded || isProfileAdded === "false" ? false : true;
  });
  const [token, setToken] = useState(() => {
    // getting localstorage value
    const token = localStorage.getItem("token");
    return token;
  });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      const socket = io("https://yummybay.herokuapp.com/delivery", {
        auth: {
          token: token,
        },
      });
      socket.on("connect", () => {
        console.log(`You connected with id ${socket.id}`);
      });
      setSocket(socket);
      return () => socket.close();
    }
  }, [token]);

  const profileAddedHandler = (value) => {
    localStorage.setItem("isProfileAdded", value);
    setIsProfileAdded(value);
  };

  const loginHandler = (token, isProfileAdded) => {
    setIsProfileAdded(isProfileAdded);
    setToken(token);
    localStorage.setItem("isProfileAdded", isProfileAdded);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    setIsProfileAdded(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isProfileAdded");
  };

  const isLoggedIn = token ? true : false;
  return (
    <div className="App">
      <Navbar logout={logoutHandler} />
      <Routes>
        {!isLoggedIn && (
          <Route path="/login" element={<Login login={loginHandler} />} />
        )}
        {isLoggedIn && !isProfileAdded && (
          <Route
            path="/add-profile"
            element={
              <AddProfile
                token={token}
                setIsProfileAdded={profileAddedHandler}
              />
            }
          />
        )}
        {isLoggedIn && !isProfileAdded && (
          <Route path="/" element={<Navigate to="/add-profile" replace />} />
        )}
        {isLoggedIn && isProfileAdded && (
          <Route path="/" element={<Dashboard />}>
            <Route
              path="/new-orders"
              element={<NewOrders socket={socket} token={token} />}
            />
            <Route
              path="/accepted-orders"
              element={<AcceptedOrders socket={socket} token={token} />}
            />
            <Route
              path="/delivered-orders"
              element={<DeliveredOrders token={token} />}
            />
          </Route>
        )}
        {isLoggedIn && isProfileAdded && (
          <Route
            path="/update-profile"
            element={<UpdateProfile token={token} />}
          />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        {isLoggedIn && !isProfileAdded && (
          <Route path="*" element={<Navigate to="/add-profile" replace />} />
        )}
        {isLoggedIn && isProfileAdded && (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
      {isLoggedIn && !isProfileAdded && (
        <Warning>
          <strong>
            You need to create profile before doing anything else!
          </strong>
        </Warning>
      )}
    </div>
  );
}

export default App;

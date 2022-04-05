import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NewOrders from "./pages/NewOrders/NewOrders";
import AcceptedOrders from "./pages/AcceptedOrders/AcceptedOrders";
import DeliveredOrders from "./pages/DeliveredOrders/DeliveredOrders";

function App() {
  const [token, setToken] = useState(() => {
    // getting localstorage value
    const token = localStorage.getItem("token");
    return token;
  });
  const updateToken = (value) => {
    localStorage.setItem("token", value);
    setToken(value);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = token ? true : false;
  return (
    <div className="App">
      <Navbar logoutClick={clearToken} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Landing />} />
        {!isLoggedIn && (
          <Route path="/login" element={<Login setToken={updateToken} />} />
        )}
        {isLoggedIn && (
          <Route path="/new-orders" element={<NewOrders token={token} />} />
        )}
        {isLoggedIn && (
          <Route
            path="/accepted-orders"
            element={<AcceptedOrders token={token} />}
          />
        )}
        {isLoggedIn && (
          <Route
            path="/delivered-orders"
            element={<DeliveredOrders token={token} />}
          />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

import { useState } from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import Lists from "./Pages/Lists";
import Orders from "./Pages/Orders";
import Returns from "./Pages/Returns";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/lists" element={<Lists />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/returns" element={<Returns />} />
      </Routes>
    </>
  );
}

export default App;

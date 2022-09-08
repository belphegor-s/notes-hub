import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import Home from "../pages/Home/Home";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;

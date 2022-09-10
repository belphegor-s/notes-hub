import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import SignIn from "../pages/auth/SignIn";
import Home from "../pages/Home/Home";
import { getUserFromDatabase } from "../firebase/firebaseConfig";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const uid = localStorage.getItem("id");

  const isValidateUser = async (id) => {
    const user = await getUserFromDatabase(id);
    if (user) {
      const { id } = user;
      if (id === uid) {
        navigate("/home", { replace: true });
      }
    }
  };

  useEffect(() => {
    isValidateUser(uid);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {authCtx.isLoggedIn && <Route path="/home" element={<Home />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

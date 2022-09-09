import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";
import SignIn from "../pages/auth/SignIn";
import Home from "../pages/Home/Home";
import { getUserFromDatabase } from "../firebase/firebaseConfig";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const uid = localStorage.getItem("id");
  const [isUserExist, setIsUserExist] = useState(null);

  const isValidateUser = async (id) => {
    const user = await getUserFromDatabase(id);
    if (user) {
      const { id } = user;
      if (id === uid) {
        navigate("/home", { replace: true });
        setIsUserExist(true);
      } else {
        setIsUserExist(false);
      }
    } else {
      setIsUserExist(false);
    }
  };

  useEffect(() => {
    isValidateUser(uid);
  }, []);

  //   console.log(isUserExist);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {authCtx.isLoggedIn && <Route path="/home" element={<Home />} />}
    </Routes>
  );
};

export default AppRoutes;

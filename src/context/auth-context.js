import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  id: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  setId: (id) => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialId = localStorage.getItem("id");
  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(initialId);

  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    setId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  const setIdHandler = (id) => {
    setId(id);
    localStorage.setItem("id", id);
  };

  const contextValue = {
    token: token,
    id: id,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setId: setIdHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

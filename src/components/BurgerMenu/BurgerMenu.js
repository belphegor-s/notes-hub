import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./BurgerMenu.css";
import { BsArrowClockwise } from "react-icons/bs";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const BurgerMenu = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };

  window.onload = () => {
    const menu = document.getElementsByClassName("bm-menu")[0];
    menu.style.overflow = "hidden";
  };

  return (
    <div>
      <Menu right>
        {props.userData ? (
          <>
            <img
              src={props.userData.profilePhoto}
              alt="profile-pic"
              className="profile-pic"
            />
            <div className="greeting">Hi, {props.userData.name}</div>
          </>
        ) : (
          <BsArrowClockwise className="loading" />
        )}

        <button onClick={logoutHandler} className="logout-button">
          Logout
        </button>
      </Menu>
    </div>
  );
};

export default BurgerMenu;

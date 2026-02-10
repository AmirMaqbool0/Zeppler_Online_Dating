import React from "react";
import "./style.css";
import Logo from "../../assests/logo.png";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="header-containetr">
      <div className="header-content">
        <div className="header-logo">
          <img src={Logo} alt="" />
        </div>
        <div className="header-btn">
          <NavLink to={"/login"}>
            <button>Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;

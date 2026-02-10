import React from "react";
import "./style.css";
import Logo from "../../assests/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="colon1-colon2">
          <div className="colon1">
            <div className="footer-logo">
              <img src={Logo} alt="" />
            </div>
          </div>
          <div className="colon2">
            <span>
              123 Market St. #22B, Charlottesville, California 44635, USA
            </span>
            <span>(+123) 456 7890</span>
            <span>contact@zeppler.com</span>
          </div>
        </div>
        <div className="colon3-colon4">
          <div className="colon3">
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                {" "}
                <li>Home</li>{" "}
              </Link>
              <Link to={"/about"} style={{ textDecoration: "none" }}>
                <li>About</li>
              </Link>
              <Link to={"/blogs"} style={{ textDecoration: "none" }}>
                {" "}
                <li>Blogs</li>{" "}
              </Link>
              <Link to={"/askedquestion"} style={{ textDecoration: "none" }}>
                <li>FAQs</li>{" "}
              </Link>
              <Link to={"/contactus"} style={{ textDecoration: "none" }}>
                <li>Contact us</li>
              </Link>
            </ul>
          </div>
          <div className="colon4">
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Linkedin</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-line-container">
        <div className="footer-line"></div>
      </div>
      <div className="subfooter">
        <span>Copyright © 2024 Zeppler. All Rights Reserved.</span>
        <Link to={"/terms&condition"} style={{ textDecoration: "none" }}>
          <span>Terms & Conditions</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;

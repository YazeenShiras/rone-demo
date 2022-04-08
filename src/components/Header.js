import React from "react";
import "./Header.css";
import logo from "../assets/Logo1.svg";
import PrimaryButton from "./PrimaryButton";
import { Link } from "react-router-dom";
import menuIcon from "../assets/menuIcon.svg";
import closeIcon from "../assets/close.svg";

const Header = () => {
  const menuClick = () => {
    document.getElementById("headermenuButton").style.display = "none";
    document.getElementById("headercloseButton").style.display = "block";
    document.getElementById("headerContainer").style.height = "300px";
    document.getElementById("headerMobile").style.display = "flex";
  };

  const closeClick = () => {
    document.getElementById("headermenuButton").style.display = "block";
    document.getElementById("headercloseButton").style.display = "none";
    document.getElementById("headerContainer").style.height = "80px";
    document.getElementById("headerMobile").style.display = "none";
  };

  return (
    <div className="headerContainer" id="headerContainer">
      <div className="header">
        <div className="header__logo">
          <a href="/profile">
            <img src={logo} alt="Rone-logo" />
          </a>
        </div>
        <div className="header__right__main">
          <nav>
            <ul>
              <li>
                <a href="https://roneinfotrade.in">Legal</a>
              </li>
              <li>
                <a href="/https://roneinfotrade.in">Forum</a>
              </li>
              <li>
                <a href="https://roneinfotrade.in">FAQ</a>
              </li>
              <li>
                <a href="https://roneinfotrade.in">Contact</a>
              </li>
            </ul>
          </nav>
          <Link to="/" className="buttonContainer">
            <PrimaryButton content="Log Out" />
          </Link>
          <div className="headerMenuContainer">
            <img
              id="headermenuButton"
              className="headermenuButton"
              src={menuIcon}
              alt=""
              onClick={menuClick}
            />
            <img
              id="headercloseButton"
              className="headercloseButton"
              src={closeIcon}
              alt=""
              onClick={closeClick}
            />
          </div>
        </div>
      </div>
      <div className="headerMobile" id="headerMobile">
        <nav>
          <ul>
            <li>
              <a href="https://roneinfotrade.in">Legal</a>
            </li>
            <li>
              <a href="https://roneinfotrade.in">Forum</a>
            </li>
            <li>
              <a href="https://roneinfotrade.in">FAQ</a>
            </li>
            <li>
              <a href="https://roneinfotrade.in">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import "./Header.css";
import logo from "../assets/Logo1.svg";
import PrimaryButton from "./PrimaryButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
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
              <a href="https://roneinfotrade.in">FAQ</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </nav>
        <Link to="/register" className="buttonContainer">
          <PrimaryButton content="Register / Login" />
        </Link>
      </div>
    </div>
  );
};

export default Header;

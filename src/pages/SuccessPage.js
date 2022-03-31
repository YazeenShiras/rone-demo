import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import "./SuccessPage.css";
import "../components/Header.css";
import logo from "../assets/Logo1.svg";
import successImg from "../assets/successimg.svg";

const SuccessPage = () => {
  return (
    <div className="successPage">
      <div className="header">
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="Rone-logo" />
          </a>
        </div>
        <div className="header__right__main">
          <Link to="/" className="buttonContainer">
            <PrimaryButton content="Register" />
          </Link>
        </div>
      </div>
      <div className="successPageContainer">
        <p>
          your payment was successful <br /> check your mail for <br />
          confirmation
        </p>
        <img src={successImg} alt="" />
      </div>
    </div>
  );
};

export default SuccessPage;

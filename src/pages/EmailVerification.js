import React from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const EmailVerification = () => {
  async function handleSubmit() {
    document.getElementById("loaderVerifyEmail").style.display = "block";
    document.getElementById("veryfyEmail").style.display = "none";
  }

  return (
    <div
      className="bodyRegister"
      style={{ backgroundImage: `url('/registerBg.png')` }}
    >
      <div className="header__bodyRegister">
        <div className="header__left">
          <div>
            <img className="header__logo" src={logo} alt="Rone Logo" />
          </div>
        </div>
        <div className="header__right">
          <div className="header__menu__container">
            <img src={menu} alt="" />
          </div>
        </div>
      </div>
      <div className="content__bodyRegister">
        <div className="image__container__bodyRegister">
          <img src={register} alt="" />
        </div>
        <div className="inputs__container__bodyRegister">
          <h2>Your Email verification Pending</h2>
          <form className="form" action="">
            <div className="register__button__form" onClick={handleSubmit}>
              <div className="loader__container__login" id="loaderVerifyEmail">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="veryfyEmail">CONTINUE</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";

const HomePage = () => {
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
          <h2>
            Are you an <br /> existing user?
          </h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>Rone ID</legend>
              <div className="input__box">
                <input id="roneID" type="text" />
              </div>
            </fieldset>
            <p className="errorText" id="errorMobile">
              Enter your Rone ID
            </p>
            <div className="register__button__form">NEXT</div>
          </form>
          <div className="alreadyRegistered__container">
            <p className="alreadyRegisterd">Don't have a Rone ID? </p>
            <Link to="/">
              <p className="login__AlreadyRegisterd"> Register / Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

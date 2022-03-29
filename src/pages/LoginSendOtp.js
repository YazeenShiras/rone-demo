import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import SecondaryButton from "../components/SecondaryButton";
import "./AuthStyles.css";

const LoginSendOtp = () => {
  const [isdetails, setIsdetails] = useState(false);
  const [loginNumber, setLoginNumber] = useState("");

  async function handleSubmit() {
    let url = new URL("https://rone111.herokuapp.com/OTP_Genarator/rone/login");
    url.search = new URLSearchParams({
      mobile_num: loginNumber,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === 202) {
      window.onbeforeunload = function (e) {
        window.onunload = function () {
          window.localStorage.isMySessionActive = "false";
        };
        return undefined;
      };
      window.onload = function () {
        window.localStorage.isMySessionActive = "true";
      };
      localStorage.setItem("mob", loginNumber);
      window.location.href = "/verifyotplogin";
    } else if (data.status === 404) {
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Enter your Registered Mobile Number";
    }
  }

  const storeMobile = () => {
    setLoginNumber(document.getElementById("number").value);
  };

  useEffect(() => {
    if (loginNumber !== "") {
      let isnum = /^\d+$/.test(loginNumber);
      if (loginNumber.length === 10) {
        if (isnum) {
          setIsdetails(true);
        } else {
          setIsdetails(false);
        }
      } else {
        setIsdetails(false);
      }
    }
  }, [loginNumber]);

  const loginClick = () => {
    if (loginNumber === "") {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Mobile Number required";
    } else {
      let isnum = /^\d+$/.test(loginNumber);
      if (loginNumber.length === 10) {
        if (isnum) {
          document.getElementById("errorMobile").style.display = "none";
        } else {
          document.getElementById("errorMobile").style.display = "block";
          document.getElementById("errorMobile").innerHTML =
            "Enter a valid Mobile Number";
        }
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Mobile Number";
      }
      if (isdetails) {
        handleSubmit();
      }
    }
  };

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
          <Link to="/">
            <SecondaryButton content="Register" />
          </Link>
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
            Login with <br />
            Mobile Number
          </h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>Mobile Number</legend>
              <div className="input__box">
                <input onChange={storeMobile} id="number" type="text" />
              </div>
            </fieldset>
            <p id="errorMobile" className="error__varifyOtp">
              Enter a valid Mobile Number
            </p>
            <div onClick={loginClick} className="register__button__form">
              SENT OTP
            </div>
          </form>
          <div className="alreadyRegistered__container">
            <p className="alreadyRegisterd">Not registered ? </p>
            <Link to="/">
              <p className="login__AlreadyRegisterd">Register</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSendOtp;

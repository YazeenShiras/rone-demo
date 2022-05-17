import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import SecondaryButton from "../components/SecondaryButton";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const LoginSendOtp = () => {
  const [isdetails, setIsdetails] = useState(false);
  const [loginNumber, setLoginNumber] = useState("");
  const [roneId, setRoneId] = useState("");
  const [emailRes, setEmailRes] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  async function handleSubmit() {
    console.log("access to handleSubmit");
    let url = new URL(
      "https://ronedcard.herokuapp.com/OTP_Genarator/rone/login"
    );
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
      localStorage.setItem("mob", data.mob);
      localStorage.setItem("token", data.otp);
      window.location.href = "/verifyotplogin";
    } else if (data.status === 404) {
      document.getElementById("loaderSentOtp").style.display = "none";
      document.getElementById("sentOTP").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Enter your Registered Mobile Number";
    }
  }

  async function checkOldUserId() {
    let url = new URL(
      "https://ronedtest.herokuapp.com/if_old_user_createroneid"
    );

    url.search = new URLSearchParams({
      emailid: emailRes,
      mobile: loginNumber,
      roneid: roneId,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 404) {
      handleSubmit();
    } else {
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML = "error occured";
      document.getElementById("loaderSentOtp").style.display = "none";
      document.getElementById("sentOTP").style.display = "block";
    }
  }

  async function roneCheck() {
    document.getElementById("loaderSentOtp").style.display = "block";
    document.getElementById("sentOTP").style.display = "none";
    let url = new URL("https://ronedtest.herokuapp.com/rone_id_authentication");
    url.search = new URLSearchParams({
      rone_id: roneId,
    });

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.New_user !== null) {
      setEmailRes(data.New_user.email);
    }
    if (data.New_user !== null || data.Old_users !== null) {
      document.getElementById("loaderSentOtp").style.display = "none";
      document.getElementById("sentOTP").style.display = "block";
      localStorage.setItem("roneid", roneId);
      checkOldUserId();
    }
    if (data.New_user === null && data.Old_users === null) {
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML = "invalid rONE ID";
      document.getElementById("loaderSentOtp").style.display = "none";
      document.getElementById("sentOTP").style.display = "block";
    }
  }

  const storeMobile = () => {
    setLoginNumber(document.getElementById("number").value);
    setRoneId(document.getElementById("roneId").value);
  };

  useEffect(() => {
    if (loginNumber !== "") {
      let isnum = /^\d+$/.test(loginNumber);
      if (loginNumber.length !== 0) {
        if (isnum) {
          setIsdetails(true);
        } else {
          setIsdetails(false);
        }
        if (roneId !== "") {
          setIsdetails(true);
        }
      } else {
        setIsdetails(false);
      }
    }
  }, [loginNumber, roneId]);

  const loginClick = () => {
    if (loginNumber === "" || roneId === "") {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Must fill *Required fields";
    } else {
      let isnum = /^\d+$/.test(loginNumber);
      if (loginNumber.length !== 0) {
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
        roneCheck();
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
            Enter your rONE ID
            <br />
            and Mobile Number to Login
          </h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>rONE ID*</legend>
              <div className="input__box">
                <input onChange={storeMobile} id="roneId" type="text" />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Mobile Number*</legend>
              <div className="input__box">
                <input onChange={storeMobile} id="number" type="text" />
              </div>
            </fieldset>
            <p id="errorMobile" className="error__varifyOtp">
              Enter a valid Mobile Number
            </p>
            <div onClick={loginClick} className="register__button__form">
              <div className="loader__container__login" id="loaderSentOtp">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="sentOTP">SENT OTP TO MOBILE</p>
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

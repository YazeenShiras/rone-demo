import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import SecondaryButton from "../components/SecondaryButton";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const VerifyOtpLogin = () => {
  const [otp, setOtp] = useState("");
  const [isotp, setIsotp] = useState(false);
  const [mob, setMob] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    window.onbeforeunload = function (e) {
      window.onunload = function () {
        window.localStorage.isMySessionActive = "false";
      };
      return undefined;
    };
    window.onload = function () {
      window.localStorage.isMySessionActive = "true";
    };
    var mob = localStorage.getItem("mob");
    setMob(mob);
    var newtoken = localStorage.getItem("token");
    setToken(newtoken);
  }, []);

  async function handleSubmit() {
    document.getElementById("loaderVeryfyLogin").style.display = "block";
    document.getElementById("veryfyLogin").style.display = "none";
    let url = new URL(
      "https://web-production-ece8.up.railway.app/otp_verification_login"
    );
    url.search = new URLSearchParams({
      mobile: mob,
      otp: otp,
    });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: token,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 202) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("loggedAccessToken", data.access_token);
      localStorage.setItem("loggedRefreshToken", data.refresh_token);
      localStorage.setItem("loggedImg", data.profile);
      localStorage.setItem("newuserid", data.user_id);
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } else if (data.status === 404) {
      document.getElementById("loaderVeryfyLogin").style.display = "none";
      document.getElementById("veryfyLogin").style.display = "block";
      document.getElementById("errorVarifyOtp").innerHTML = data.message;
      document.getElementById("errorVarifyOtp").style.display = "block";
    }
  }

  async function resendOtp() {
    let url = new URL(
      "https://web-production-ece8.up.railway.app/OTP_Genarator/rone/login"
    );
    url.search = new URLSearchParams({
      mobile_num: mob,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // eslint-disable-next-line no-unused-vars
    const data = await res.json();
  }

  const storeOtp = () => {
    setOtp(document.getElementById("otp").value);
  };

  useEffect(() => {
    if (otp !== "") {
      let isnum = /^\d+$/.test(otp);
      if (otp.length === 6) {
        if (isnum) {
          setIsotp(true);
        } else {
          setIsotp(false);
        }
      } else {
        setIsotp(false);
      }
    }
  }, [otp]);

  const verifyClick = () => {
    let isnum = /^\d+$/.test(otp);
    if (otp === "") {
      document.getElementById("errorVarifyOtp").style.display = "block";
    } else if (otp.length !== 6) {
      document.getElementById("errorVarifyOtp").innerHTML = "Invalid OTP";
      document.getElementById("errorVarifyOtp").style.display = "block";
    } else if (!isnum) {
      document.getElementById("errorVarifyOtp").innerHTML = "Invalid OTP";
      document.getElementById("errorVarifyOtp").style.display = "block";
    } else {
      if (isotp) {
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
          <h2>Verify OTP</h2>
          <form className="form" action="">
            <fieldset className="input__container">
              <legend>Enter OTP*</legend>
              <div className="input__box">
                <input onChange={storeOtp} id="otp" type="text" />
              </div>
            </fieldset>
            <p id="errorVarifyOtp" className="error__varifyOtp">
              OTP *Required
            </p>
            <div onClick={verifyClick} className="register__button__form">
              <div className="loader__container__login" id="loaderVeryfyLogin">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="veryfyLogin">VERIFY & LOGIN</p>
            </div>
          </form>
          <div className="alreadyRegistered__container">
            <p
              onClick={resendOtp}
              style={{ cursor: "pointer" }}
              className="alreadyRegisterd"
            >
              Resend OTP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpLogin;

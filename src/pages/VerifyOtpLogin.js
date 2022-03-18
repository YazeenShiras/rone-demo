import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import "./AuthStyles.css";

const VerifyOtpLogin = () => {
  const [otp, setOtp] = useState("");
  const [isotp, setIsotp] = useState(false);
  const [mob, setMob] = useState("");

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
  }, []);

  async function loginUser() {
    const res = await fetch("https://rone111.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: mob,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "true") {
      localStorage.removeItem("newuserid");
      localStorage.setItem("useridlogin", data.user_id);
      console.log(data.user_id);
      window.location.href = "/profile";
    } else {
      console.error();
    }
  }

  async function handleSubmit() {
    let url = new URL("https://rone111.herokuapp.com/otp_verification_login");
    url.search = new URLSearchParams({
      mobile: mob,
      otp: otp,
    });
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 202) {
      loginUser();
    } else if (data.status === 404) {
      document.getElementById("errorVarifyOtp").innerHTML = data.message;
      document.getElementById("errorVarifyOtp").style.display = "block";
      console.log(otp);
    }
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
          <Link className="loginButton__container" to="/login">
            <PrimaryButton content="Login" />
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
              <legend>Enter OTP</legend>
              <div className="input__box">
                <input onChange={storeOtp} id="otp" type="text" />
              </div>
            </fieldset>
            <p id="errorVarifyOtp" className="error__varifyOtp">
              Please enter OTP
            </p>
            <div onClick={verifyClick} className="register__button__form">
              VERIFY & LOGIN
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpLogin;

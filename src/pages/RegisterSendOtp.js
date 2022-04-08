import React, { useEffect, useState } from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const RegisterSendOtp = () => {
  const [number, setNumber] = useState("");
  const [isdetails, setIsdetails] = useState(false);

  async function handleSubmit() {
    document.getElementById("loaderSentOtpRegister").style.display = "block";
    document.getElementById("sentOTPRegister").style.display = "none";
    let url = new URL(
      "https://ronecard.herokuapp.com/OTP_Genarator/rone/singup"
    );
    url.search = new URLSearchParams({
      mobile_num: number,
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
      window.onbeforeunload = function (e) {
        window.onunload = function () {
          window.localStorage.isMySessionActive = "false";
        };
        return undefined;
      };
      window.onload = function () {
        window.localStorage.isMySessionActive = "true";
      };
      localStorage.setItem("newmob", data.mob);
      localStorage.setItem("token", data.otp);
      console.log(data.otp);
      document.getElementById("loaderSentOtpRegister").style.display = "none";
      document.getElementById("sentOTPRegister").style.display = "block";
      window.location.href = "/verifyotpregister";
    } else if (data.status === 400) {
      document.getElementById("loaderSentOtpRegister").style.display = "none";
      document.getElementById("sentOTPRegister").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Mobile Number already exists";
    }
  }

  useEffect(() => {
    if (number !== "") {
      let isnum = /^\d+$/.test(number);
      if (number.length === 10) {
        if (isnum) {
          setIsdetails(true);
        } else {
          setIsdetails(false);
        }
      } else {
        setIsdetails(false);
      }
    } else {
      setIsdetails(false);
    }
  }, [number]);

  const storeValues = () => {
    setNumber(document.getElementById("number").value);
  };

  const sendOTPClick = () => {
    if (number === "") {
      document.getElementById("errorMobile").style.display = "block";
    } else {
      let isnum = /^\d+$/.test(number);
      if (number.length === 10) {
        if (isnum) {
          document.getElementById("errorMobile").style.display = "none";
        } else {
          document.getElementById("errorMobile").style.display = "block";
          document.getElementById("errorMobile").innerHTML =
            "Enter valid Mobile Number";
        }
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter valid Mobile Number";
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
            Enter your Mobile <br /> Number to Register
          </h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>Mobile Number</legend>
              <div className="input__box">
                <input onChange={storeValues} id="number" type="text" />
              </div>
            </fieldset>
            <p className="errorText" id="errorMobile">
              Enter your Mobile Number
            </p>
            <div onClick={sendOTPClick} className="register__button__form">
              <div
                className="loader__container__login"
                id="loaderSentOtpRegister"
              >
                <PulseLoader color="#ffffff" />
              </div>
              <p id="sentOTPRegister">SENT OTP</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSendOtp;

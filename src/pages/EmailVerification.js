import React, { useEffect, useState } from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const EmailVerification = () => {
  const [tokenLink, setTokenLink] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  function getToken() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let valueString = paramString.split("&")[0];
    let queryString = new URLSearchParams(valueString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      setTokenLink(pair[1]);
    }
  }

  function getEmail() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let valueString = paramString.split("&")[1];
    let queryString = new URLSearchParams(valueString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      setEmail(pair[1]);
    }
  }

  function getRoneID() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let valueString = paramString.split("&")[2];
    let queryString = new URLSearchParams(valueString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      localStorage.setItem("roneid", pair[1]);
    }
  }

  useEffect(() => {
    getEmail();
    getToken();
    getRoneID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let n = 2;
    let first = tokenLink.substring(n);
    setToken(first.substring(0, first.length - 1));
    console.log(token);
  }, [tokenLink, token]);

  async function handleSubmit() {
    console.log(token);
    console.log(email);
    if (email !== "" && token !== "") {
      document.getElementById("loaderVerifyEmail").style.display = "block";
      document.getElementById("veryfyEmail").style.display = "none";
      let url = new URL(
        "https://ronedcard.herokuapp.com/otp_verification_for_email"
      );
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_link_token: token,
          email: email,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 202) {
        document.getElementById("message").innerHTML =
          "Your Email verification Success";
        document.getElementById("loaderVerifyEmail").style.display = "none";
        document.getElementById("veryfyEmail").style.display = "block";
        window.location.href = "/register";
      }
      if (data.status === 404) {
        document.getElementById("message").innerHTML =
          "Your Email verification Failed";
        document.getElementById("loaderVerifyEmail").style.display = "none";
        document.getElementById("veryfyEmail").style.display = "block";
        document.getElementById("errorEmailValidation").style.display = "flex";
      }
    }
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
          <h2 id="message">Your Email verification Pending...</h2>
          <form className="form" action="">
            <div className="register__button__form" onClick={handleSubmit}>
              <div className="loader__container__login" id="loaderVerifyEmail">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="veryfyEmail">VERIFY EMAIL</p>
            </div>
          </form>
          <p className="error__varifyOtp" id="errorEmailValidation">
            Invalid token or expired token
            <a style={{ color: "#0000EE", marginTop: "10px" }} href="/">
              back to home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

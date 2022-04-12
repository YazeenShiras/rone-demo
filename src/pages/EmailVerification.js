import React, { useEffect, useState } from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import "./AuthStyles.css";
import PulseLoader from "react-spinners/PulseLoader";

const EmailVerification = () => {
  const [tokenLink, setTokenLink] = useState("");
  const [tokenLocal, setTokenLocal] = useState("");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      setTokenLink(pair[1]);
    }
  }

  useEffect(() => {
    getParameters();
    var token = localStorage.getItem("tokenEmail");
    setTokenLocal(token);
  }, []);

  async function handleSubmit() {
    document.getElementById("loaderVerifyEmail").style.display = "block";
    document.getElementById("veryfyEmail").style.display = "none";
    let url = new URL(
      "https://ronecard.herokuapp.com/otp_verification_for_email"
    );
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_link_token: tokenLink,
        lockal_storage_token: tokenLocal,
      }),
    });
    const data = await res.json();
    console.log(data);
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
              <p id="veryfyEmail">VERIFY EMAIL</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

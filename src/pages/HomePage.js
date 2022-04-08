import React, { useState } from "react";
import logo from "../assets/Logo1.svg";
import menu from "../assets/menuIcon.svg";
import register from "../assets/register.svg";
import PulseLoader from "react-spinners/PulseLoader";

const HomePage = () => {
  const [roneId, setRoneId] = useState("");
  const [pan, setPan] = useState("");

  const storeValue = () => {
    setRoneId(document.getElementById("roneId").value);
    setPan(document.getElementById("pan").value);
  };

  async function handleSubmit() {
    document.getElementById("loaderNextButton").style.display = "block";
    document.getElementById("nextText").style.display = "none";

    let url = new URL(
      "https://testdatassz.herokuapp.com/roneid_with_pan_authentication"
    );
    url.search = new URLSearchParams({
      rone_id: roneId,
      pancard: pan,
    });

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 200) {
      localStorage.setItem("roneid", roneId);
      localStorage.setItem("pan", pan);
      document.getElementById("loaderNextButton").style.display = "none";
      document.getElementById("nextText").style.display = "block";
      window.location.href = "/register";
    }
    if (data.status === 404) {
      document.getElementById("errorRoneId").style.display = "block";
      document.getElementById("loaderNextButton").style.display = "none";
      document.getElementById("nextText").style.display = "block";
      document.getElementById("errorRoneId").innerHTML =
        "invalid RONE ID or PAN";
    }
  }

  const nextClick = () => {
    if (roneId === "" || pan === "") {
      document.getElementById("errorRoneId").style.display = "block";
    } else {
      document.getElementById("errorRoneId").style.display = "none";
      handleSubmit();
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
            Enter your <br /> RONE ID and PAN
          </h2>
          <form autoComplete="off" className="form" action="">
            <fieldset className="input__container">
              <legend>Rone ID*</legend>
              <div className="input__box">
                <input onChange={storeValue} id="roneId" type="text" />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>PAN*</legend>
              <div className="input__box">
                <input onChange={storeValue} id="pan" type="text" />
              </div>
            </fieldset>
            <p className="errorText" id="errorRoneId">
              Must fill *Required fields
            </p>
            <div className="register__button__form" onClick={nextClick}>
              <div className="loader__container__login" id="loaderNextButton">
                <PulseLoader color="#ffffff" />
              </div>
              <p id="nextText">NEXT</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

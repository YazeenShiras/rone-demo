import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import "./SuccessPage.css";
import "../components/Header.css";
import logo from "../assets/Logo1.svg";
import successImg from "../assets/successimg.svg";
import axios from "axios";

const SuccessPage = () => {
  const [payId, setPayId] = useState("");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      setPayId(pair[1]);
    }
  }

  useEffect(() => {
    getParameters();

    async function paymnetReciept() {
      console.log(payId);
      axios
        .post("https://rone-card.herokuapp.com/orderDetails", {
          paymentId: payId,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
        });
    }
    if (payId !== undefined && payId !== "") {
      paymnetReciept();
    }
  }, [payId]);

  return (
    <div className="successPage">
      <div className="header" style={{ height: "80px" }}>
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="Rone-logo" />
          </a>
        </div>
        <div className="header__right__main">
          <Link to="/" className="buttonContainer">
            <PrimaryButton content="Register" />
          </Link>
        </div>
      </div>
      <div className="successPageContainer">
        <p>
          your payment was successful <br /> check your mail for <br />
          confirmation
        </p>
        <img src={successImg} alt="" />
      </div>
    </div>
  );
};

export default SuccessPage;

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

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

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
        .post("https://web-production-ece8.up.railway.app/orderDetails", {
          paymentId: payId,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          setEmail(data.receipt.email);
          setNumber(data.receipt.contact);
        });
    }
    if (payId !== undefined && payId !== "") {
      paymnetReciept();
    }
  }, [payId]);

  useEffect(() => {
    async function createRoneId() {
      let endpoint =
        "https://web-production-ece8.up.railway.app/create_roneid_for_newuser";

      let url = new URL(endpoint);
      url.search = new URLSearchParams({
        emailid: email,
        mobile: number,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        document.getElementById("emailsentLink").style.display = "block";
      }
      if (data.message === "please try after 20 seconds again") {
        document.getElementById("emailsentLink").innerHTML =
          "please wait for 5 seconds.";
        document.getElementById("emailsentLink").style.display = "block";
        document.getElementById("emailsentLink").style.color = "#d52a33";
        setTimeout(() => {
          createRoneId();
        }, 5000);
      }
      if (data.message === "already use this mail_id") {
        document.getElementById("emailsentLink").innerHTML =
          "Email already used to create rONE ID";
        document.getElementById("emailsentLink").style.display = "block";
        document.getElementById("emailsentLink").style.color = "#d52a33";
      }
      if (data.message === "mobile number already exists !") {
        document.getElementById("emailsentLink").innerHTML =
          "Mobile Number already used to create rONE ID";
        document.getElementById("emailsentLink").style.display = "block";
        document.getElementById("emailsentLink").style.color = "#d52a33";
      }
    }

    if (email !== "" && number !== "") {
      createRoneId();
    } else {
      console.log("not found email");
    }
  }, [email, number]);

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
        <p className="paymnetSuccessText">
          your payment was successful <br /> check your mail for <br />
          confirmation
        </p>
        <p id="emailsentLink" className="emailSent">
          Your rONE ID sended to <br />{" "}
          <span
            style={{ color: "blueviolet", marginTop: "20px", fontSize: "14px" }}
          >
            {email}
          </span>
        </p>
        <img src={successImg} alt="" />
      </div>
    </div>
  );
};

export default SuccessPage;

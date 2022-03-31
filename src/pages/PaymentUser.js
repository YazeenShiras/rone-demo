import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.svg";
import PrimaryButton from "../components/PrimaryButton";
import "./PaymentUser.css";
import "../components/Header.css";
import "./AuthStyles.css";
import "./UserDetails.css";
import useRazorpay from "react-razorpay";

const PaymentUser = () => {
  const Razorpay = useRazorpay();

  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      setId(pair[1]);
    }
  }

  useEffect(() => {
    getParameters();

    async function getUserdata() {
      let url = "https://arclifs-services.herokuapp.com/paymentUser";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          userId: id,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.userData) {
        setUserId(data.userData.userId);
        setname(data.userData.username);
        setNumber(data.userData.phone);
        setEmail(data.userData.email);
      }
    }
    getUserdata();
  }, [id]);

  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_EHNghn2cibZ5vK",
      amount: "3000",
      currency: "INR",
      name: "Rone Payment",
      description: "Test Transaction",
      image: { logo },
      order_id: userId,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: { name },
        email: { email },
        contact: { number },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#d52a33",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [userId, Razorpay, name, email, number]);

  return (
    <div className="paymnetUser">
      <div className="header">
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
      <div className="container__paymnetUser">
        <h2>Rone Payment</h2>
        <form action="" autoComplete="off" className="form">
          <fieldset className="input__container">
            <legend>Name</legend>
            <div className="input__box">
              <input readOnly type="text" name="username" value={name} />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Mobile Number</legend>
            <div className="input__box">
              <input readOnly type="tel" name="mobile" value={number} />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Email</legend>
            <div className="input__box">
              <input
                readOnly
                id="email"
                type="email"
                name="email"
                value={email}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Price</legend>
            <div className="input__box">
              <input
                readOnly
                id="price"
                type="text"
                name="price"
                value="₹ 1500"
              />
            </div>
          </fieldset>
          <div onClick={handlePayment} className="saveProfileButton">
            <div className="loader__container__login"></div>
            <p>PAY WITH RAZORPAY</p>
          </div>
          <div className="saveProfileButton">
            <div className="loader__container__login"></div>
            <p>CASH ON DELIVERY</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentUser;

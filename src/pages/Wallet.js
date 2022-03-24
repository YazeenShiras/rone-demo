import React, { useEffect, useState } from "react";
import "./ProfileSettings.css";
import "./Wallet.css";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import roneCardbg from "../assets/roneCard.svg";
import ronelogoCard from "../assets/roneCardLogo.svg";
import copy from "../assets/copyRed.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import copyLink from "copy-to-clipboard";
import PropagateLoader from "react-spinners/PropagateLoader";

const Wallet = () => {
  const [userid, setUserId] = useState("");
  const [userNameCard, SetUserNameCard] = useState("");

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [copyLinkText, setCopyLinkText] = useState("");
  const [resName, setResName] = useState("");
  const [resNumber, setResNumber] = useState("");

  const [isdetails, setIsdetails] = useState(false);

  const [cardBalance, setCardBalance] = useState("50");

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
    var newName = localStorage.getItem("nameForWallet");
    SetUserNameCard(newName);
    var newid = localStorage.getItem("newuserid");
    setUserId(newid);
  }, []);

  useEffect(() => {
    if (name !== "") {
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
    }
  }, [name, number]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setNumber(document.getElementById("number").value);
    setEmail(document.getElementById("email").value);
  };

  const copyToClipboard = () => {
    console.log(copyLinkText);
    copyLink(copyLinkText);
  };

  const generateLink = () => {
    document.getElementById("formForGenerateLink").style.display = "block";
    setName("");
    setNumber("");
    setEmail("");
  };

  async function handleSubmit() {
    setCardBalance(cardBalance - 1);
    document.getElementById("formForGenerateLink").style.display = "none";
    document.getElementById("loaderWidget").style.display = "block";
    let url = "https://arclifs-services.herokuapp.com/generateLink";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: userid,
        username: name,
        phone: number,
        email: email,
      }),
    });
    const data = await response.json();
    console.log(data);
    setCopyLinkText(data.referral);
    setResName(data.username);
    setResNumber(data.phone);
    if (data) {
      document.getElementById("loaderWidget").style.display = "none";
      document.getElementById("transactionLinksContainer").style.display =
        "flex";
    }
  }

  const submitClick = () => {
    console.log("clicked to submit");
    console.log(name);
    console.log(number);
    if (name === "" || number === "") {
      console.log("name or number null");
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Enter Name and Mobile Number";
    } else {
      console.log("number and Name check");
      let isnum = /^\d+$/.test(number);
      if (number.length === 10) {
        console.log("10 digit number true");
        if (isnum) {
          console.log("number true");
          document.getElementById("errorMobile").style.display = "none";
        } else {
          console.log("number false");
          document.getElementById("errorMobile").style.display = "block";
          document.getElementById("errorMobile").innerHTML =
            "Enter a Mobile Number";
        }
      } else {
        console.log("10 digit number false");
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Mobile Number";
      }
      if (isdetails) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="settingsPage">
      <Header />
      <div
        className="bgContainer__settings"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2>Settings</h2>
        <div className="formContainer__settings">
          <div className="titleContainer__formContainer">
            <Link
              to="/settings/profile"
              className=" titleHeaderlink mainSettings"
            >
              Profile
            </Link>
            <p className="accountSettings titleHeaderlink">Account</p>
            <Link
              to="/settings/Wallet"
              className="activeHeaderWallet titleHeaderlink"
            >
              Wallet
            </Link>
            <p className="themesSettings titleHeaderlink">Themes</p>
          </div>
          <div className="walletContent__container">
            <div
              className="roneCard__container"
              style={{ backgroundImage: `url(${roneCardbg})` }}
            >
              <div className="leftContaniner__roneCard">
                <img src={ronelogoCard} alt="" />
                <div className="bottomContainer__leftContainer__roneCard">
                  <h5>{userNameCard}</h5>
                  <div className="cardBalanceContainer">
                    <p>Card Balance</p>
                    <h3>{cardBalance}\50</h3>
                  </div>
                </div>
              </div>
              <p>RONE CARD</p>
            </div>
            <p className="buyMoretext">Low card balance? Buy More</p>
            <div className="buyMoreCards__button">Buy More Cards</div>
            <div className="TransactionContainerTitle">
              <span></span>
              <div className="TransactionLinks">Transactions Links</div>
            </div>
            <div className="loader__container__widget" id="loaderWidget">
              <PropagateLoader color="#d52a33" />
            </div>
            <div
              className="transactionLinks__container"
              id="transactionLinksContainer"
            >
              <div className="TransactionLink__card">
                <div className="left__card__transaction">
                  <p>
                    1.<span>{resName}</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>{`+91 ` + resNumber}</p>
                </div>
                <div
                  onClick={copyToClipboard}
                  className="middleRight__card__transaction"
                >
                  <img src={copy} alt="" />
                  <p>Copy</p>
                </div>
                <div className="deleteButton__transaction__card">Delete</div>
              </div>
            </div>

            <div onClick={generateLink} className="generateNewLink__button">
              Generate New Link
            </div>

            <div className="formForGenerateLink" id="formForGenerateLink">
              <form autoComplete="off" className="form__sumbitForGenerate">
                <fieldset className="input__container__form__update">
                  <legend>Name</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="name"
                      type="text"
                      name="username"
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Mobile Number</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="number"
                      type="text"
                      name="number"
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Email</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="email"
                      type="email"
                      name="email"
                    />
                  </div>
                </fieldset>
              </form>
              <p className="errorName" id="errorName">
                Please Enter Name
              </p>
              <p className="errorMobile" id="errorMobile">
                Enter a valid Mobile Number
              </p>
              <div onClick={submitClick} className="submitButtonGenerateLink">
                SUBMIT
              </div>
            </div>

            <div className="TransactionContainerTitle transactionHistoryTitle">
              <span></span>
              <div className="TransactionLinks">Transactions History</div>
            </div>

            <div className="transactionHistoryContainer">
              <div className="titltTransactionHistoryContainer">
                <p className="dateTitle">Date</p>
                <p className="typeTitle">Transaction Type</p>
                <p className="statusTitle">Status</p>
              </div>

              <div className="card__transactionHistory TransactionLink__card">
                {/* <p className="dateTransactionHistory">18/03/2022</p>
                <p className="typetransactionHistory">Rone credit purchase</p>
                <p className="statusTransactionHistory">Success</p> */}
                <h4>No Transaction History</h4>
              </div>
              {/* <div className="card__transactionHistory TransactionLink__card">
                <p className="dateTransactionHistory">18/03/2022</p>
                <p className="typetransactionHistory">Rone credit purchase</p>
                <p className="statusTransactionHistory">Success</p>
              </div>
              <div className="card__transactionHistory TransactionLink__card">
                <p className="dateTransactionHistory">18/03/2022</p>
                <p className="typetransactionHistory">Rone credit purchase</p>
                <p className="statusTransactionHistory">Success</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="footerContainerWallet">
        <Footer />
      </div>
    </div>
  );
};

export default Wallet;

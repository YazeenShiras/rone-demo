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
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [copyLinkText, setCopyLinkText] = useState("");

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
    var newid = localStorage.getItem("newuserid");
    setUserId(newid);
    var username = localStorage.getItem("nameForWallet");
    setName(username);
    var usernumber = localStorage.getItem("NumberForWallet");
    setNumber(usernumber);
  }, []);

  const copyToClipboard = () => {
    console.log(copyLinkText);
    copyLink(copyLinkText);
  };

  async function generateLink() {
    document.getElementById("loaderWidget").style.display = "block";
    let url = "https://arclifs-services.herokuapp.com/generateLink";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: userid,
      }),
    });
    const data = await response.json();
    console.log(data);
    setCopyLinkText(data.referral);
    if (data) {
      document.getElementById("loaderWidget").style.display = "none";
      document.getElementById("transactionLinksContainer").style.display =
        "flex";
    }
  }

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
                  <h5>{name}</h5>
                  <div className="cardBalanceContainer">
                    <p>Card Balance</p>
                    <h3>0\50</h3>
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
                    1.<span>{name}</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>{`+91 ` + number}</p>
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

              {/* <div className="TransactionLink__card">
                <div className="left__card__transaction">
                  <p>
                    2. <span>{name}</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>{`+91 ` + number}</p>
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

              <div className="TransactionLink__card">
                <div className="left__card__transaction">
                  <p>
                    3. <span>{name}</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>{`+91 ` + number}</p>
                </div>
                <div
                  onClick={copyToClipboard}
                  className="middleRight__card__transaction"
                >
                  <img src={copy} alt="" />
                  <p>Copy</p>
                </div>
                <div className="deleteButton__transaction__card">Delete</div>
              </div> */}
            </div>

            <div onClick={generateLink} className="generateNewLink__button">
              Generate New Link
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

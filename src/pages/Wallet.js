import React from "react";
import "./ProfileSettings.css";
import "./Wallet.css";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import roneCardbg from "../assets/roneCard.svg";
import ronelogoCard from "../assets/roneCardLogo.svg";
import copy from "../assets/copyRed.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Wallet = () => {
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
              Profile Settings
            </Link>
            <p className="accountSettings titleHeaderlink">Account Settings</p>
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
                  <h5>John Doe</h5>
                  <div className="cardBalanceContainer">
                    <p>Card Balance</p>
                    <h3>12\12</h3>
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
            <div className="transactionLinks__container">
              <div className="TransactionLink__card">
                <div className="left__card__transaction">
                  <p>
                    1. <span>John Doe</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>+91 99999 99999</p>
                </div>
                <div className="middleRight__card__transaction">
                  <img src={copy} alt="" />
                  <p>Copy Link</p>
                </div>
                <div className="deleteButton__transaction__card">Delete</div>
              </div>

              <div className="TransactionLink__card">
                <div className="left__card__transaction">
                  <p>
                    2. <span>John Doe</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>+91 99999 99999</p>
                </div>
                <div className="middleRight__card__transaction">
                  <img src={copy} alt="" />
                  <p>Copy Link</p>
                </div>
                <div className="deleteButton__transaction__card">Delete</div>
              </div>

              <div className="TransactionLink__card">
                <div className="left__card__transaction">
                  <p>
                    3. <span>John Doe</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>+91 99999 99999</p>
                </div>
                <div className="middleRight__card__transaction">
                  <img src={copy} alt="" />
                  <p>Copy Link</p>
                </div>
                <div className="deleteButton__transaction__card">Delete</div>
              </div>
            </div>

            <div className="generateNewLink__button">Generate New Link</div>

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
                <p className="dateTransactionHistory">18/03/2022</p>
                <p className="typetransactionHistory">Rone credit purchase</p>
                <p className="statusTransactionHistory">Success</p>
              </div>
              <div className="card__transactionHistory TransactionLink__card">
                <p className="dateTransactionHistory">18/03/2022</p>
                <p className="typetransactionHistory">Rone credit purchase</p>
                <p className="statusTransactionHistory">Success</p>
              </div>
              <div className="card__transactionHistory TransactionLink__card">
                <p className="dateTransactionHistory">18/03/2022</p>
                <p className="typetransactionHistory">Rone credit purchase</p>
                <p className="statusTransactionHistory">Success</p>
              </div>
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

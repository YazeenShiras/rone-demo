import React, { useEffect, useState } from "react";
import "./ProfileSettings.css";
import "./Wallet.css";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import roneCardbg from "../assets/roneCard.svg";
import ronelogoCard from "../assets/roneCardLogo.svg";
import { Link } from "react-router-dom";
/* import Footer from "../components/Footer"; */
import PropagateLoader from "react-spinners/PropagateLoader";

const Wallet = () => {
  const [userid, setUserId] = useState("");
  const [userNameCard, SetUserNameCard] = useState("");

  const [roneId, setRoneId] = useState("");
  const [pan, setPan] = useState("");

  const [initialcards, setInitialcards] = useState(49);
  const [totalcards, setTotalcards] = useState(50);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [copyLinkText, setCopyLinkText] = useState("");
  const [resName, setResName] = useState("");
  const [resNumber, setResNumber] = useState("");

  const [isdetails, setIsdetails] = useState(false);

  const [buyCardCount, setBuyCardCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1500);

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
    var rone_id = localStorage.getItem("roneid");
    setRoneId(rone_id);
    var panid = localStorage.getItem("pan");
    setPan(panid);
  }, []);

  useEffect(() => {
    async function cardDetails() {
      let url = "https://rone-card.herokkuapp/cardBalance";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          panId: pan,
          roneId: roneId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.balance) {
        setInitialcards(data.balance.initialcards);
        setTotalcards(data.balance.totalcards);
        setRoneId(data.balance.roneId);
      }
    }

    if (
      pan !== "" &&
      pan !== undefined &&
      roneId !== "" &&
      roneId !== undefined
    ) {
      cardDetails();
    }
  }, [pan, roneId]);

  const [refDetails, setRefDetails] = useState([]);

  useEffect(() => {
    async function getRefferralDetails() {
      let url = "https://ronecard.herokuapp.com/referralDetails";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userid,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data === "Data not Found") {
        console.log("no links available");
      }
      if (data.referral) {
        setRefDetails(data.referral);
      }
    }
    if (userid !== "" && userid !== undefined) {
      getRefferralDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  const [refHistory, setRefHistory] = useState([]);

  useEffect(() => {
    async function getTransactionHistory() {
      let url = "https://ronecard.herokuapp.com/transcationHistory";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userid,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "No data found") {
        console.log("no transaction history");
      }
      if (data.history) {
        setRefHistory(data.history);
      }
    }
    if (userid !== "" && userid !== undefined) {
      getTransactionHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

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
        if (email !== "") {
          let isEmail = email.includes("@") && email.includes(".com");
          if (isEmail) {
            setIsdetails(true);
          } else {
            setIsdetails(false);
          }
        }
      } else {
        setIsdetails(false);
      }
    }
  }, [name, number, email]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setNumber(document.getElementById("number").value);
    setEmail(document.getElementById("email").value);
  };

  const generateLink = () => {
    document.getElementById("formForGenerateLink").style.display = "block";
  };

  async function handleSubmit() {
    document.getElementById("formForGenerateLink").style.display = "none";
    document.getElementById("loaderWidget").style.display = "block";
    let url = "https://ronecard.herokuapp.com/generateLink";

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
    document.getElementById("sendText").innerHTML = "Send";
    if (name === "" || number === "" || email === "") {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Enter Name, Mobile Number and Email";
    } else {
      let isnum = /^\d+$/.test(number);
      if (number.length === 10) {
        if (isnum) {
          document.getElementById("errorMobile").style.display = "none";
        } else {
          document.getElementById("errorMobile").style.display = "block";
          document.getElementById("errorMobile").innerHTML =
            "Enter a Mobile Number";
        }
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Mobile Number";
      }
      let isEmail = email.includes("@") && email.includes(".com");
      if (isEmail) {
        document.getElementById("errorMobile").style.display = "none";
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Email";
      }
      if (isdetails) {
        handleSubmit();
      }
    }
  };

  const buyMoreCarsClick = () => {
    document.getElementById("buyMoreCardsContainer").style.display = "flex";
  };

  const onCardInputChange = () => {
    setBuyCardCount(document.getElementById("numberOfCards").value);
  };

  useEffect(() => {
    setTotalPrice(buyCardCount * 1500);
  }, [buyCardCount]);

  const buyRoneCardClick = () => {
    console.log("buy card click");
  };

  async function sendClick() {
    if (document.getElementById("sendText").innerHTML === "Send") {
      document.getElementById("sendText").innerHTML = "sending...";
      document.getElementById("sendText").style.color = "#F48D43";
      let urlSend = "https://ronecard.herokuapp.com/shareLink";

      const response = await fetch(urlSend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          url: copyLinkText,
        }),
      });
      const data = await response.json();
      if (data.status === 202) {
        document.getElementById("sendText").innerHTML = "success";
        document.getElementById("sendText").style.color = "#00ad07";
      }
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
            <Link
              to="/settings/QR-code"
              className="themesSettings titleHeaderlink"
            >
              QR Code
            </Link>
          </div>
          <div className="walletContent__container">
            <div
              className="roneCard__container"
              style={{ backgroundImage: `url(${roneCardbg})` }}
            >
              <div className="leftContaniner__roneCard">
                <img src={ronelogoCard} alt="" />
                <div className="bottomContainer__leftContainer__roneCard">
                  <div className="cardHolder">
                    <h5>{userNameCard}</h5>
                    <p>{roneId}</p>
                  </div>
                  <div className="cardBalanceContainer">
                    <p>Card Balance</p>
                    <h3>
                      {initialcards}\{totalcards}
                    </h3>
                  </div>
                </div>
              </div>
              <p>RONE CARD</p>
            </div>
            <p className="buyMoretext">Low card balance? Buy More</p>
            <div onClick={buyMoreCarsClick} className="buyMoreCards__button">
              Buy More Cards
            </div>
            <div className="buyMoreCardsContainer" id="buyMoreCardsContainer">
              <div className="cardCountContainer">
                <div className="inputContainerbuyMoreCard">
                  <p>Enter number of Cards</p>
                  <div className="inputBuyMoreCard">
                    <input
                      id="numberOfCards"
                      type="text"
                      name="numberOfCards"
                      defaultValue="1"
                      onChangeCapture={onCardInputChange}
                    />
                  </div>
                </div>
                <h3>X</h3>
                <div className="priceCountContainer">
                  <p>Price of 1 card</p>
                  <h2>1500</h2>
                </div>
                <h3>=</h3>
                <div className="totalCountContainer">
                  <p>Total Price</p>
                  <h2>{totalPrice}</h2>
                </div>
              </div>
              <div
                onClick={buyRoneCardClick}
                className="generateNewLink__button"
              >
                BUY RONE CARD
              </div>
            </div>
            <div className="TransactionContainerTitle">
              <span></span>
              <div className="TransactionLinks">Transactions Links</div>
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
                    {refDetails.length + 1}.<span>{resName}</span>
                  </p>
                </div>
                <div className="middleLeft__card__transaction">
                  <p>{`+91 ` + resNumber}</p>
                </div>
                <div
                  onClick={sendClick}
                  className="middleRight__card__transaction"
                >
                  <p id="sendText">Send</p>
                </div>
                <div className="deleteButton__transaction__card">Delete</div>
              </div>
            </div>

            <div className="transactionLinks__containerMount">
              {refDetails
                .slice(0)
                .reverse()
                .map((data, index) => {
                  return (
                    <div className="TransactionLink__card" key={index}>
                      <div className="left__card__transaction">
                        <p>
                          {refDetails.length - index}.
                          <span>{data.username}</span>
                        </p>
                      </div>
                      <div className="middleLeft__card__transaction">
                        <p>{`+91 ` + data.phone}</p>
                      </div>
                      <div className="middleRight__card__transaction">
                        <p>Expired</p>
                      </div>
                      <div className="deleteButton__transaction__card">
                        Delete
                      </div>
                    </div>
                  );
                })}
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

              {refHistory
                .slice(0)
                .reverse()
                .map((history, index) => {
                  return (
                    <div key={index} className="TransactionLink__card">
                      <p className="dateTransactionHistory">{history.Date}</p>
                      <p className="typetransactionHistory">
                        {history.transcation}
                      </p>
                      <p className="statusTransactionHistory">
                        {history.status}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

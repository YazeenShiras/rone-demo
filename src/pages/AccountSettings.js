import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import "./ProfileSettings.css";

const AccountSettings = () => {
    const [id, setId] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [secretKey, setSecretKey] = useState("");

    useEffect(() => {
        var newid = localStorage.getItem("newuserid");
        setId(newid);
      }, []);

    const storeValues = () => {
        setApiKey(document.getElementById("api_key").value);
        setSecretKey(document.getElementById("secret_key").value);
      };

    async function saveClick() {
        if(apiKey !== "" && secretKey !== "") {
            let url = "https://rone-card.herokuapp.com/credentials";
    
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  userId: id,
                  apikey: apiKey,
                  apisecret: secretKey,
              }),
            });
            const data = await response.json();
            console.log(data);
            if(data.status === 200) {
                window.location.href = '/profile'
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
        <h2>Account</h2>
        <div className="formContainer__settings">
          <div className="titleContainer__formContainer">
            <Link to="/settings/profile" className="mainSettings titleHeaderlink">Profile</Link>
            <p className="activeHeaderAccount titleHeaderlink">Account</p>
            <Link
              to="/settings/Wallet"
              className="walletSettings titleHeaderlink"
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
          <div className="profileImageContainer__form__update">
            <div className="inputboxContainers__update">
              <form autoComplete="off" className="form__update">
                <fieldset className="input__container__form__update">
                  <legend>API KEY*</legend>
                  <div className="input__box__form__update">
                    <input
                    onChange={storeValues}
                      id="api_key"
                      type="text"
                      name="apiKey"
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>SECRET KEY*</legend>
                  <div className="input__box__form__update">
                    <input
                     onChange={storeValues}
                      id="secret_key"
                      type="text"
                      name="secretKey"
                    />
                  </div>
                </fieldset>
                
                <fieldset className="input__container__form__update">
                  <legend>UPI ID*</legend>
                  <div className="input__box__form__update">
                    <input
                     onChange={storeValues}
                      id="upi_id"
                      type="text"
                      name="upiId"
                    />
                  </div>
                </fieldset>
                <p id="errorAccount" className="errorAccount">
                  Must fill *Required fields
                </p>
                <div onClick={saveClick} className="updateProfileButton">
                  <div
                    className="loader__container__login"
                    id="updateProfileLoader"
                  >
                    <PulseLoader color="#ffffff" />
                  </div>
                  <p id="updateProfileText">SAVE</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="footerContainerProfileSettings">
        <Footer />
      </div> */}
    </div>
  )
}

export default AccountSettings
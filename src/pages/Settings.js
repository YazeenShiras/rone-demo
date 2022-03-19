import React from "react";
import "./Settings.css";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import user from "../assets/user.png";
import camera from "../assets/camera.svg";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import whatsapp from "../assets/whatsapp.svg";
import instagram from "../assets/instagram.svg";

const EditProfile = () => {
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
            <p className="activeHeader">Profile Settings</p>
            <p className="accountSettings">Account Settings</p>
            <p className="walletSettings">Wallet</p>
            <p className="themesSettings">Themes</p>
          </div>
          <div className="profileImageContainer__form__update">
            <div
              className="imageUpdateContainer"
              style={{ backgroundImage: `url(${user})` }}
            >
              <div className="cameraIcon__container">
                <input type="file" name="file" id="inpFile" accept=".png" />
                <img src={camera} alt="" />
              </div>
            </div>
            <div className="inputboxContainers__update">
              <form autoComplete="off" className="form__update">
                <fieldset className="input__container__form__update">
                  <legend>Name</legend>
                  <div className="input__box__form__update">
                    <input type="text" name="username" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Profession</legend>
                  <div className="input__box__form__update">
                    <input id="profession" type="text" name="profession" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update__textare">
                  <legend>Bio</legend>
                  <div className="input__box__form__update__textArea">
                    <textarea name="bio" id="bio"></textarea>
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Location</legend>
                  <div className="input__box__form__update">
                    <input id="location" type="text" name="location" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Mobile Number</legend>
                  <div className="input__box__form__update">
                    <input type="tel" name="mobile" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Email</legend>
                  <div className="input__box__form__update">
                    <input id="email" type="email" name="email" />
                  </div>
                </fieldset>

                <div className="socialContainerTitle">
                  <span></span>
                  <div className="socialMedia">Social Media</div>
                </div>

                <div className="socialLinksinputContainer">
                  <img src={facebook} alt="" />
                  <input type="text" placeholder="Enter your facebook link" />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={linkedin} alt="" />
                  <input type="text" placeholder="Enter your LinkedIn link" />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={twitter} alt="" />
                  <input type="text" placeholder="Enter your Twitter link" />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={whatsapp} alt="" />
                  <input type="text" placeholder="Enter your Whatsapp Number" />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={instagram} alt="" />
                  <input type="text" placeholder="Enter your instagram link" />
                </div>

                <div id="errorContainer" className="errorContainer">
                  <p id="errorName">Enter a valid Email</p>
                  <p id="errorMobile">Enter a valid Mobile Number</p>
                </div>
                <div className="updateProfileButton">UPDATE</div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="updateForm__container"></div>
    </div>
  );
};

export default EditProfile;

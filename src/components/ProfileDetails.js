/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ProfileDetails.css";
import bg from "../assets/profilebg.svg";
import share from "../assets/shareGray.svg";
import settings from "../assets/settings.svg";
import star from "../assets/star.svg";
import starRed from "../assets/starRed.svg";
import shareWhite from "../assets/share.svg";
import QRCode from "react-qr-code";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import payment from "../assets/payment.svg";
import download from "../assets/download.svg";
import file from "../assets/download/file.pdf";
import user from "../assets/user.png";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Link } from "react-router-dom";

const ProfileDetails = () => {
  const [isShare, setShare] = useState(false);
  const [userid, setUserId] = useState("");
  const [userData, setUserData] = useState("");
  const [useridLogin, setUseridLogin] = useState("");
  /* const [action, setAction] = useState(""); */

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
    var newuseridLogin = localStorage.getItem("useridlogin");
    setUseridLogin(newuseridLogin);

    console.log("userid : " + userid);
    console.log("useridLogin : " + useridLogin);

    let url = new URL("https://rone111.herokuapp.com/user_details");
    url.search = new URLSearchParams({
      user_id: parseInt(userid),
    });

    const getUser = async () => {
      const req = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      console.log(data);
      setUserData(data);
    };

    let urllogin = new URL("https://rone111.herokuapp.com/user_details");
    url.search = new URLSearchParams({
      user_id: parseInt(useridLogin),
    });

    const getUserLogin = async () => {
      const req = await fetch(urllogin, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      console.log(data);
      setUserData(data);
    };

    if (userid !== "") {
      getUser();
    }
    if (useridLogin !== "") {
      getUserLogin();
    }
  }, [userid, useridLogin]);

  const shareToSocial = () => {
    var shareButton = document.getElementById("shareButton");
    var shareIconsContainer = document.getElementById("shareIconsContainer");
    var profileMainTextContainer = document.getElementById(
      "profileMain__text__container"
    );
    shareIconsContainer.style.display = "flex";
    profileMainTextContainer.style.marginTop = "20px";
    shareButton.style.color = "#d52a33";
    setShare(true);
    if (isShare) {
      shareIconsContainer.style.display = "none";
      profileMainTextContainer.style.marginTop = "50px";
      shareButton.style.color = "#000000";
      setShare(false);
    }
  };

  return (
    <div className="profileDetails" style={{ backgroundImage: `url(${bg})` }}>
      <div className="imageContainer">
        <img src={userData.img ? userData.img : user} alt="" />
      </div>
      <div className="rightContainer__profile">
        <div className="header__rightConatiner__profile">
          <div
            onClick={shareToSocial}
            id="shareButton"
            className="shareButton buttons__header__profile"
          >
            <img src={share} alt="" />
            <p>Share</p>
          </div>
          <Link
            to="/settings/editprofile"
            className="settingsButton buttons__header__profile"
          >
            <img src={settings} alt="" />
            <p>Settings</p>
          </Link>
        </div>
        <div className="shareIconsContainer" id="shareIconsContainer">
          <FacebookShareButton
            children={
              <img className="shareIcon__profile" src={facebook} alt="" />
            }
            url="https://rone-demo.vercel.app/"
          />
          <LinkedinShareButton
            children={
              <img src={linkedin} className="shareIcon__profile" alt="" />
            }
            url="https://rone-demo.vercel.app/"
          />
          <TwitterShareButton
            children={
              <img src={twitter} className="shareIcon__profile" alt="" />
            }
            url="https://rone-demo.vercel.app/"
          />
        </div>
        <div
          className="profileMain__text__container"
          id="profileMain__text__container"
        >
          <div className="profile__title__container">
            <div className="left__profile__title">
              <h2>{userData.name}</h2>
              <p>{userData.proff}</p>
              <div className="rating__container">
                <img src={starRed} alt="" />
                <img src={starRed} alt="" />
                <img src={starRed} alt="" />
                <img src={starRed} alt="" />
                <img src={star} alt="" />
              </div>
            </div>
            <div className="right__profile__title">
              <div className="qrCode__container">
                <QRCode
                  size={70}
                  level="H"
                  title="Rone"
                  value="https://rone-demo.vercel.app/"
                />
                <div className="shareThisqr__button">
                  <img src={shareWhite} alt="" />
                  Share QR
                </div>
              </div>
            </div>
          </div>
          <p>{userData.bio}</p>
          <div className="socialButton__container">
            <a href="/" className="facebook__contain social__button__profile">
              <img src={facebook} alt="" />
              Facebook
            </a>
            <a href="/" className="linkedIn__contain social__button__profile">
              <img src={linkedin} alt="" />
              LinkedIn
            </a>
            <a href="/" className="twitter__contain social__button__profile">
              <img src={twitter} alt="" />
              Twitter
            </a>
          </div>
          <div className="other__buttons__container">
            <div className="payment__button">
              <img src={payment} alt="" />
              Make Payment
            </div>
            <a href={file} download className="download__button">
              <img src={download} alt="" />
              Download Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

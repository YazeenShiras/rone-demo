/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ProfileDetails.css";
import bg from "../assets/images/mainBg.png";
import share from "../assets/shareWhite.svg";
import settings from "../assets/settings.svg";
import star from "../assets/star.svg";
import starRed from "../assets/starRed.svg";
import shareWhite from "../assets/share.svg";
import QRCode from "react-qr-code";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import whatsapp from "../assets/whatsapp.svg";
import instagram from "../assets/instagram.svg";
import payment from "../assets/payment.svg";
import download from "../assets/download.svg";
import file from "../assets/download/file.pdf";
import user from "../assets/user.png";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Link } from "react-router-dom";
import phoneIcon from "../assets/phone.svg";
import mailIcon from "../assets/mail.svg";
import locationIcon from "../assets/location.svg";
import copy from "../assets/copy.svg";

const ProfileDetails = () => {
  const [isShare, setShare] = useState(false);
  const [userid, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  /* const [loggedAccessState, setLoggedAccess] = useState(""); */
  const [loggedImgState, setLoggedImg] = useState("");
  const [loggedNameState, setLoggedName] = useState("");
  const [loggedProffState, setLoggedProff] = useState("");
  const [loggedBioState, setLoggedBio] = useState("");

  /*  var loggedAccess = localStorage.getItem("loggedAccessToken"); */
  var loggedImg = localStorage.getItem("loggedImg");
  var loggedName = localStorage.getItem("loggedName");
  var loggedProff = localStorage.getItem("loggedProff");
  var loggedBio = localStorage.getItem("loggedBio");

  useEffect(() => {
    /* window.onbeforeunload = function (e) {
      window.onunload = function () {
        window.localStorage.isMySessionActive = "false";
      };
      return undefined;
    }; */
    /* window.onload = function () {
      window.localStorage.isMySessionActive = "true";
    }; */

    /* window.localStorage.isMySessionActive = "true"; */

    var newid = localStorage.getItem("newuserid");
    setUserId(newid);

    console.log("userid : " + userid);

    let url = new URL("https://rone111.herokuapp.com/user_details");
    url.search = new URLSearchParams({
      user_id: userid,
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

    if (userid !== "") {
      getUser();
    } else {
      setLoggedImg(loggedImg);
      setLoggedName(loggedName);
      setLoggedProff(loggedProff);
      setLoggedBio(loggedBio);
    }
  }, [userid]);

  const shareToSocial = () => {
    var shareButton = document.getElementById("shareButton");
    var shareIconsContainer = document.getElementById("shareIconsContainer");
    var profileContainerProfileDetails = document.getElementById(
      "profileContainer__profileDetails"
    );
    shareIconsContainer.style.display = "flex";
    profileContainerProfileDetails.style.marginTop = "10px";
    setShare(true);
    if (isShare) {
      shareIconsContainer.style.display = "none";
      profileContainerProfileDetails.style.marginTop = "30px";
      setShare(false);
    }
  };

  return (
    <div className="profileDetails" style={{ backgroundImage: `url(${bg})` }}>
      <div className="headerConatiner__profile">
        <div
          onClick={shareToSocial}
          id="shareButton"
          className="shareButton buttons__header__profile"
        >
          <img src={share} alt="" />
          <p>Share</p>
        </div>
        <Link
          to="/settings"
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
          children={<img src={twitter} className="shareIcon__profile" alt="" />}
          url="https://rone-demo.vercel.app/"
        />
        <WhatsappShareButton
          children={
            <img src={whatsapp} className="shareIcon__profile" alt="" />
          }
          url="https://rone-demo.vercel.app/"
        />
        <InstapaperShareButton
          children={
            <img
              src={instagram}
              className="shareIcon__profile instagramIconShare"
              alt=""
            />
          }
          url="https://rone-demo.vercel.app/"
        />
      </div>
      <div
        className="profileContainer__profileDetails"
        id="profileContainer__profileDetails"
      >
        <div className="leftContainer__profileDetails">
          <div
            className="imgContainer__profile"
            style={{
              backgroundImage: `url(${
                userData.img ? userData.img : loggedImgState
              })`,
            }}
          ></div>
          <div className="left__profile__title">
            <h2>{userData.name ? userData.name : loggedNameState}</h2>
            <p>{userData.proff ? userData.proff : loggedProffState}</p>
            <div className="rating__container">
              <img src={starRed} alt="" />
              <img src={starRed} alt="" />
              <img src={starRed} alt="" />
              <img src={starRed} alt="" />
              <img src={star} alt="" />
            </div>
          </div>
        </div>
        <div className="rightContainer__profile">
          <div className="topContainer__rightProfile">
            <p>{userData.bio ? userData.bio : loggedBioState}</p>
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
          <div className="socialButton__container">
            <a href="/" className="facebook__contain social__button__profile">
              <img src={facebook} alt="" />
            </a>
            <a href="/" className="linkedIn__contain social__button__profile">
              <img src={linkedin} alt="" />
            </a>
            <a href="/" className="twitter__contain social__button__profile">
              <img src={twitter} alt="" />
            </a>
            <a href="/" className="whatsapp__contain social__button__profile">
              <img src={whatsapp} alt="" />
            </a>
            <a href="/" className="insta__contain social__button__profile">
              <img src={instagram} alt="" />
            </a>
          </div>
          <div className="otherOptions__container">
            <a href="/" className="optionButton__profile">
              <img src={phoneIcon} alt="" />
              Call
            </a>
            <a href="/" className="optionButton__profile">
              <img src={mailIcon} alt="" />
              Mail
            </a>
            <a href="/" className="optionButton__profile">
              <img src={locationIcon} alt="" />
              Locate Us
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
          <div className="refer__container">
            <img src={copy} alt="" />
            <div className="text__container__refer">
              <p>Refer your friends and earn use code </p>
              <span className="refer__code">RONE12345</span>
              <span className="clicktocopy">click to copy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

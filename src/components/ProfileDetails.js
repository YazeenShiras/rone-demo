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
/* import youtube from "../assets/youtube.svg"; */
import telegram from "../assets/telegram.svg";
import payment from "../assets/payment.svg";
import download from "../assets/download.svg";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
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
  const [userSocial, setUserSocial] = useState("");

  useEffect(() => {
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
      localStorage.setItem("nameForWallet", data.name);
    };

    let socialUrl = new URL("https://rone111.herokuapp.com/get_social_links");
    socialUrl.search = new URLSearchParams({
      user_id: userid,
    });

    const getSocial = async () => {
      const req = await fetch(socialUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      console.log(data);
      setUserSocial(data.data);
    };

    if (userid !== "") {
      getUser();
      getSocial();
    } else {
      console.log("userid not found or null");
    }
  }, [userid]);

  const shareToSocial = () => {
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
          to="/settings/profile"
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
        {/* <InstapaperShareButton
          children={
            <img src={instagram} className="shareIcon__profile " alt="" />
          }
          url="https://rone-demo.vercel.app/"
        />
        <WhatsappShareButton
          children={
            <img
              src={youtube}
              className="shareIcon__profile youtubeIconShare"
              alt=""
            />
          }
          url="https://rone-demo.vercel.app/"
        /> */}
        <TelegramShareButton
          children={
            <img
              src={telegram}
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
              backgroundImage: `url(${userData.img})`,
            }}
          ></div>
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
        </div>
        <div className="rightContainer__profile">
          <div className="topContainer__rightProfile">
            <p>{userData.bio}</p>
            <div className="qrCode__container">
              <QRCode
                size={window.outerWidth <= "500px" ? 70 : 50}
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
            <a
              href={`https://www.facebook.com/${userSocial.fb_link}`}
              className="facebook__contain social__button__profile"
            >
              <img src={facebook} alt="" />
            </a>
            <a
              href={userSocial.linkdin_link}
              className="linkedIn__contain social__button__profile"
            >
              <img src={linkedin} alt="" />
            </a>
            <a
              href={`https://twitter.com/${userSocial.twitter_link}`}
              className="twitter__contain social__button__profile"
            >
              <img src={twitter} alt="" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${userSocial.whatssapp_link}`}
              className="whatsapp__contain social__button__profile"
            >
              <img src={whatsapp} alt="" />
            </a>
            <a
              href={`https://www.instagram.com/${userSocial.insta_link}/`}
              className="insta__contain social__button__profile"
            >
              <img src={instagram} alt="" />
            </a>
            {/* <a href="/" className="youtube__contain social__button__profile">
              <img src={youtube} alt="" />
            </a> */}
            <a
              href={`https://t.me/${userSocial.teligram_link}`}
              className="telegram__contain social__button__profile"
            >
              <img src={telegram} alt="" />
            </a>
          </div>
          <div className="otherOptions__container">
            <a
              href={`tel:` + userData.phone_num}
              className="optionButton__profile"
            >
              <img src={phoneIcon} alt="" />
              Call
            </a>
            <a
              href={`mailto:` + userData.email}
              className="optionButton__profile"
            >
              <img src={mailIcon} alt="" />
              Mail
            </a>
            <a
              href={
                `https://www.google.com/maps/search/?api=1&query=` +
                userData.location
              }
              className="optionButton__profile"
            >
              <img src={locationIcon} alt="" />
              Locate Us
            </a>
          </div>
          <div className="other__buttons__container">
            <div className="payment__button">
              <img src={payment} alt="" />
              Make Payment
            </div>
            <a
              href="https://rone-demo.vercel.app/profile"
              download
              className="download__button"
            >
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

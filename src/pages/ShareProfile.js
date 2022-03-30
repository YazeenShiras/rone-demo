/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../components/ProfileDetails.css";
import "../components/ImageGalleryMain.css";
import sort from "../assets/sort.svg";
import "./ShareProfile.css";
import bg from "../assets/images/mainBg.png";
import star from "../assets/star.svg";
import starRed from "../assets/starRed.svg";
import shareWhite from "../assets/share.svg";
import QRCode from "react-qr-code";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import whatsapp from "../assets/whatsapp.svg";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import payment from "../assets/payment.svg";
import download from "../assets/download.svg";
import phoneIcon from "../assets/phone.svg";
import mailIcon from "../assets/mail.svg";
import locationIcon from "../assets/location.svg";
import copy from "../assets/copy.svg";
import Pdf from "react-to-pdf";
import Header from "../components/Header";
import axios from "axios";
const ref = React.createRef();
const options = {
  orientation: "landscape",
  unit: "in",
  format: [7, 13],
};

const optionsMobile = {
  orientation: "portrait",
  unit: "in",
  format: [8, 11],
};

const ShareProfile = () => {
  const [userid, setUserId] = useState("");
  const [userData, setUserData] = useState("");

  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");

  const [allImages, setAllImages] = useState([]);

  function getParameters() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is:" + pair[0]);
      console.log("Value is:" + pair[1]);
      setUserId(pair[1]);
    }
  }

  useEffect(() => {
    getParameters();

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
      setUserData(data);
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
      console.log(data.data.fb_link);
      setFacebookLink(data.data.fb_link);
      setTwitterLink(data.data.twitter_link);
      setLinkedInLink(data.data.linkdin_link);
      setWhatsappLink(data.data.whatssapp_link);
      setInstagramLink(data.data.insta_link);
      setTelegramLink(data.data.teligram_link);
    };

    if (userid !== "" && userid !== undefined) {
      getUser();
      getSocial();
    } else {
      console.log("userid not found or null");
    }
  }, [userid]);

  useEffect(() => {
    async function getAllImages() {
      console.log("access to getAllImages");
      const endpoint = "https://rone111.herokuapp.com/access_image_gallery";

      let url = new URL(endpoint);
      url.search = new URLSearchParams({
        user_id: userid,
      });

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      await axios
        .get(url, config)
        .then((res) => {
          const data = res.data;
          console.log(data);
          if (data.sts === 404) {
            document.getElementById("imageGalleryContent").style.display =
              "none";
            document.getElementById("loadMore__button").innerHTML = "No Images";
          }
          if (data.data) {
            setAllImages(data.data);
            console.log(allImages);
          }
        })
        .catch(console.error);
    }

    if (userid !== "" && userid !== undefined) {
      getAllImages();
    }
  }, [userid]);

  return (
    <div className="shareProfile">
      <Header />
      <div
        className="profileDetails"
        style={{ marginTop: "80px", backgroundImage: `url(${bg})` }}
      >
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
                  title={`${userData.name} - Rone`}
                  value={window.location.href}
                />
                <div className="shareThisqr__button">
                  <img src={shareWhite} alt="" />
                  Share QR
                </div>
              </div>
            </div>
            <div className="socialButton__container">
              <a
                href={`https://www.facebook.com/${facebookLink}`}
                className="facebook__contain social__button__profile"
              >
                <img src={facebook} alt="" />
              </a>
              <a
                href={linkedInLink}
                className="linkedIn__contain social__button__profile"
              >
                <img src={linkedin} alt="" />
              </a>
              <a
                href={`https://twitter.com/${twitterLink}`}
                className="twitter__contain social__button__profile"
              >
                <img src={twitter} alt="" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${whatsappLink}`}
                className="whatsapp__contain social__button__profile"
              >
                <img src={whatsapp} alt="" />
              </a>
              <a
                href={`https://www.instagram.com/${instagramLink}/`}
                className="insta__contain social__button__profile"
              >
                <img src={instagram} alt="" />
              </a>
              <a
                href={telegramLink}
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
              <div className="download__web" id="downloadWeb">
                <Pdf
                  targetRef={ref}
                  options={options}
                  x={0.5}
                  y={0.5}
                  scale={1}
                  filename={`${userData.name}.pdf`}
                >
                  {({ toPdf }) => (
                    <div onClick={toPdf} className="download__button">
                      <img src={download} alt="" />
                      Download Profile
                    </div>
                  )}
                </Pdf>
              </div>
              <div className="download__mobile" id="downloadMobile">
                <Pdf
                  targetRef={ref}
                  options={optionsMobile}
                  x={0.5}
                  y={0.5}
                  scale={1.5}
                  filename={`${userData.name}.pdf`}
                >
                  {({ toPdf }) => (
                    <div onClick={toPdf} className="download__button">
                      <img src={download} alt="" />
                      Download Profile
                    </div>
                  )}
                </Pdf>
              </div>
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
      <div className="imageGalleryMain" style={{ marginBottom: "50px" }}>
        <div className="title__container__imageGalleryMain">
          <h3>Image Gallery</h3>
          <div className="viewAll__button">View All</div>
          <span></span>
          <div className="sort__button">
            Sort
            <img src={sort} alt="" />
          </div>
        </div>
        <div
          id="imageGalleryContent"
          className="content__container__imageGalleryMain"
        >
          {allImages.map((imageForGallery, index) => {
            return (
              <div
                key={index}
                style={{ backgroundImage: `url('${imageForGallery.img_url}')` }}
                className="card__products__imageContainer"
              >
                {/* <h4>Lorem Ipsum is simply dummy text of the</h4> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShareProfile;

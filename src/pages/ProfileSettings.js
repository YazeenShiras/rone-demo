import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import SyncLoader from "react-spinners/SyncLoader";
import "./ProfileSettings.css";
import Header from "../components/Header";
import bg from "../assets/settingsBg.png";
import camera from "../assets/camera.svg";
import facebook from "../assets/facebook.svg";
import linkedin from "../assets/linkedin.svg";
import twitter from "../assets/twitter.svg";
import whatsapp from "../assets/whatsapp.svg";
import instagram from "../assets/instagram.svg";
import telegram from "../assets/telegram.svg";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [userData, setUserData] = useState("");

  const [imageFile, setImageFile] = useState("");

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");

  const [img, setImg] = useState("");

  const [idForUpdate, setIdForUpdate] = useState();

  var idForUpdateForm = localStorage.getItem("newuserid");

  useEffect(() => {
    setIdForUpdate(idForUpdateForm);
    console.log(idForUpdate);

    console.log("Update Page ID: " + idForUpdate);

    let url = new URL("https://testdatassz.herokuapp.com/user_details");
    url.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const getUser = async () => {
      const req = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      /* console.log(data); */
      setUserData(data);
      setImg(data.img);
      setName(data.name);
      setProfession(data.proff);
      setLocation(data.location);
      setBio(data.bio);
      setEmail(data.email);
      setAddress(data.address);
    };

    let socialUrl = new URL(
      "https://testdatassz.herokuapp.com/get_social_links"
    );
    socialUrl.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const getSocial = async () => {
      const req = await fetch(socialUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      console.log(data.data);
      setFacebookLink(data.data.fb_link);
      setInstagramLink(data.data.insta_link);
      setTwitterLink(data.data.twitter_link);
      setLinkedInLink(data.data.linkdin_link);
      setTelegramLink(data.data.teligram_link);
      setWhatsappLink(data.data.whatssapp_link);

      console.log(data.data.fb_link);
      console.log(data.data.insta_link);
      console.log(data.data.twitter_link);
      console.log(data.data.linkdin_link);
      console.log(data.data.teligram_link);
      console.log(data.data.whatssapp_link);
    };

    if (idForUpdate !== "" && idForUpdate !== undefined) {
      getUser();
      getSocial();
    } else {
      console.log("error: idForUpdate not found or null");
    }
  }, [idForUpdate, idForUpdateForm]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setProfession(document.getElementById("profession").value);
    setBio(document.getElementById("bio").value);
    setLocation(document.getElementById("location").value);
    setAddress(document.getElementById("address").value);
    setEmail(document.getElementById("email").value);
  };

  const storeLinks = () => {
    setFacebookLink(document.getElementById("facebookLink").value);
    setLinkedInLink(document.getElementById("linkedInLink").value);
    setTwitterLink(document.getElementById("twitterLink").value);
    setWhatsappLink(document.getElementById("whatsappLink").value);
    setInstagramLink(document.getElementById("instagramLink").value);
    setTelegramLink(document.getElementById("telegramLink").value);
  };

  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          200,
          200,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            setImageFile(uri);
          },
          "base64",
          200,
          200
        );
        console.log(imageFile);
      } catch (err) {
        console.log(err);
      }
    }
  };

  async function updatePhoto() {
    const endpoint = "https://testdatassz.herokuapp.com/profile_upload_url";

    let url = new URL(endpoint);
    url.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        img_url: imageFile,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  async function updateProfile() {
    console.log(name);
    console.log(email);
    console.log(location);
    console.log(profession);
    console.log(address);
    console.log(bio);

    let url = new URL("https://testdatassz.herokuapp.com/updat_user__details");

    url.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          email_id: email,
          location: location,
          address: address,
          profession: profession,
          bio: bio,
        },
        up_name: {
          name: name,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      updatePhoto();
      updateSocial();
      window.location.href = "/profile";
    }
  }

  // eslint-disable-next-line no-unused-vars
  async function updateSocial() {
    if (
      facebookLink === undefined ||
      linkedInLink === undefined ||
      twitterLink === undefined ||
      instagramLink === undefined ||
      telegramLink === undefined ||
      whatsappLink === undefined
    ) {
      document.getElementById("errorProfileEdit").style.display = "block";
    }

    console.log(facebookLink);
    console.log(linkedInLink);
    console.log(twitterLink);
    console.log(instagramLink);
    console.log(telegramLink);
    console.log(whatsappLink);

    let url = new URL("https://testdatassz.herokuapp.com/social_links");

    url.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        fb_link: facebookLink,
        insta_link: instagramLink,
        linkdin_link: linkedInLink,
        whatssapp_link: whatsappLink,
        teligram_link: telegramLink,
        twitter_link: twitterLink,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      console.log("all set");
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
            <p className="activeHeader titleHeaderlink">Profile</p>
            <p className="accountSettings titleHeaderlink">Account</p>
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
            <div
              className="imageUpdateContainer"
              style={{
                backgroundImage: `url(${imageFile !== "" ? imageFile : img})`,
              }}
            >
              <div className="loader__container" id="loaderImage">
                <SyncLoader color="#d52a33" />
              </div>
            </div>
            <div className="cameraIcon__container">
              <input
                type="file"
                name="file"
                id="inpFile"
                accept=".png"
                onChange={fileChangedHandler}
              />
              <img src={camera} alt="" />
            </div>
            <div className="inputboxContainers__update">
              <form autoComplete="off" className="form__update">
                <fieldset className="input__container__form__update">
                  <legend>Name</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="name"
                      type="text"
                      name="username"
                      defaultValue={userData.name}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Profession</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="profession"
                      type="text"
                      name="profession"
                      defaultValue={userData.proff}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update__textare">
                  <legend>Bio</legend>
                  <div className="input__box__form__update__textArea">
                    <textarea
                      onChange={storeValues}
                      name="bio"
                      id="bio"
                      defaultValue={userData.bio}
                    ></textarea>
                  </div>
                </fieldset>
                {/* <PlaceSearch /> */}
                <fieldset className="input__container__form__update">
                  <legend>Location</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="location"
                      type="text"
                      name="location"
                      defaultValue={userData.location}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Address</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      type="text"
                      name="address"
                      id="address"
                      defaultValue={userData.address}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Country</legend>
                  <div className="input__box__form__update">
                    <input type="text" name="country" id="country" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>State</legend>
                  <div className="input__box__form__update">
                    <input type="text" name="state" id="state" />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>District</legend>
                  <div className="input__box__form__update">
                    <input type="text" name="district" id="district" />
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
                      defaultValue={userData.email}
                    />
                  </div>
                </fieldset>
                <div className="socialContainerTitle">
                  <span></span>
                  <div className="socialMedia">Social Media</div>
                </div>
                <div className="socialLinksinputContainer">
                  <img src={facebook} alt="" />
                  <input
                    id="facebookLink"
                    type="text"
                    placeholder="Enter your facebook username"
                    onChange={storeLinks}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={linkedin} alt="" />
                  <input
                    id="linkedInLink"
                    type="text"
                    placeholder="Enter your LinkedIn link"
                    onChange={storeLinks}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={twitter} alt="" />
                  <input
                    id="twitterLink"
                    type="text"
                    placeholder="Enter your Twitter username"
                    onChange={storeLinks}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={whatsapp} alt="" />
                  <input
                    id="whatsappLink"
                    type="text"
                    placeholder="Enter your Whatsapp number"
                    onChange={storeLinks}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={instagram} alt="" />
                  <input
                    id="instagramLink"
                    type="text"
                    placeholder="Enter your Instagram username"
                    onChange={storeLinks}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={telegram} alt="" />
                  <input
                    id="telegramLink"
                    type="text"
                    placeholder="Enter your Telegram username"
                    onChange={storeLinks}
                  />
                </div>
                <p id="errorProfileEdit" className="errorProfileEdit">
                  Please fill all social links fields
                </p>
                <div onClick={updateProfile} className="updateProfileButton">
                  UPDATE
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
  );
};

export default EditProfile;

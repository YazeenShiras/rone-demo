/* eslint-disable no-unused-vars */
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
import { PulseLoader } from "react-spinners";

const EditProfile = () => {
  const [imageFile, setImageFile] = useState("");

  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPinCode] = useState("");

  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");

  const [img, setImg] = useState("");

  const [idForUpdate, setIdForUpdate] = useState();
  const [username, setUserName] = useState("");

  var idForUpdateForm = localStorage.getItem("newuserid");
  var newName = localStorage.getItem("username");

  useEffect(() => {
    setIdForUpdate(idForUpdateForm);
    setUserName(newName);

    let url = new URL("https://ronecard.herokuapp.com/user_details");
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
      console.log(data);
      setImg(data.img);
      setName(data.name);
      setProfession(data.proff);
      setLocation(data.location);
      setBio(data.bio);
      setEmail(data.email);
      setCountry(data.address.country);
      setDistrict(data.address.distric);
      setState(data.address.state);
      setPinCode(data.address.pincode);
    };

    let socialUrl = new URL("https://ronecard.herokuapp.com/get_social_links");
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
      console.log(data);
      setFacebookLink(data.data.fb_link);
      setInstagramLink(data.data.insta_link);
      setTwitterLink(data.data.twitter_link);
      setLinkedInLink(data.data.linkdin_link);
      setTelegramLink(data.data.teligram_link);
      setWhatsappLink(data.data.whatssapp_link);
    };

    if (idForUpdate !== "" && idForUpdate !== undefined) {
      getUser();
      getSocial();
    }
  }, [idForUpdate, idForUpdateForm, newName, username]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setProfession(document.getElementById("profession").value);
    setBio(document.getElementById("bio").value);
    setLocation(document.getElementById("location").value);
    setCountry(document.getElementById("country").value);
    setDistrict(document.getElementById("district").value);
    setState(document.getElementById("state").value);
    setPinCode(document.getElementById("pincode").value);
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
            setImageFile(uri);
            setIsProfileChanged(true);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  async function updatePhoto() {
    const endpoint = "https://ronecard.herokuapp.com/profile_upload_url";

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

  async function saveAddress() {
    console.log(country);
    console.log(state);
    console.log(district);
    console.log(pincode);

    let url = new URL("https://ronecard.herokuapp.com/roneuser_address");

    url.search = new URLSearchParams({
      username: username,
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        counrty: country,
        state: state,
        distric: district,
        pincode: pincode,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  async function updateProfile() {
    document.getElementById("updateProfileLoader").style.display = "block";
    document.getElementById("updateProfileText").style.display = "none";
    console.log(name);
    console.log(email);
    console.log(location);
    console.log(profession);
    console.log(bio);

    let url = new URL("https://ronecard.herokuapp.com/updat_user__details");

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
          address: "",
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
      if (isProfileChanged) {
        updatePhoto();
      }
      saveAddress();
      updateSocial();
      setTimeout(() => {
        document.getElementById("updateProfileLoader").style.display = "none";
        document.getElementById("updateProfileText").style.display = "block";
        window.location.href = "/profile";
      }, 3000);
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

    let url = new URL("https://ronecard.herokuapp.com/social_links");

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
      console.log("social links Updated");
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
                      defaultValue={name}
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
                      defaultValue={profession}
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
                      defaultValue={bio}
                      maxLength="250"
                    ></textarea>
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Location</legend>
                  <div className="input__box__form__update">
                    <input
                      onChange={storeValues}
                      id="location"
                      type="text"
                      name="location"
                      defaultValue={location}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Country</legend>
                  <div className="input__box__form__update">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      onChange={storeValues}
                      defaultValue={country}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>State</legend>
                  <div className="input__box__form__update">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      onChange={storeValues}
                      defaultValue={state}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>District</legend>
                  <div className="input__box__form__update">
                    <input
                      type="text"
                      name="district"
                      id="district"
                      onChange={storeValues}
                      defaultValue={district}
                    />
                  </div>
                </fieldset>
                <fieldset className="input__container__form__update">
                  <legend>Pincode</legend>
                  <div className="input__box__form__update">
                    <input
                      type="text"
                      name="pincode"
                      id="pincode"
                      onChange={storeValues}
                      defaultValue={pincode}
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
                    defaultValue={facebookLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={linkedin} alt="" />
                  <input
                    id="linkedInLink"
                    type="text"
                    placeholder="Enter your LinkedIn link"
                    onChange={storeLinks}
                    defaultValue={linkedInLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={twitter} alt="" />
                  <input
                    id="twitterLink"
                    type="text"
                    placeholder="Enter your Twitter username"
                    onChange={storeLinks}
                    defaultValue={twitterLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={whatsapp} alt="" />
                  <input
                    id="whatsappLink"
                    type="text"
                    placeholder="Enter Whatsapp number with Country code"
                    onChange={storeLinks}
                    defaultValue={whatsappLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={instagram} alt="" />
                  <input
                    id="instagramLink"
                    type="text"
                    placeholder="Enter your Instagram username"
                    onChange={storeLinks}
                    defaultValue={instagramLink}
                  />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={telegram} alt="" />
                  <input
                    id="telegramLink"
                    type="text"
                    placeholder="Enter your Telegram username"
                    onChange={storeLinks}
                    defaultValue={telegramLink}
                  />
                </div>
                <p id="errorProfileEdit" className="errorProfileEdit">
                  Please fill all social links fields
                </p>
                <div onClick={updateProfile} className="updateProfileButton">
                  <div
                    className="loader__container__login"
                    id="updateProfileLoader"
                  >
                    <PulseLoader color="#ffffff" />
                  </div>
                  <p id="updateProfileText">UPDATE PROFILE</p>
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

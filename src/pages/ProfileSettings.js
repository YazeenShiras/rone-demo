/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import youtube from "../assets/youtube.svg";
import telegram from "../assets/telegram.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
/* import PlaceSearch from "../components/PlaceSearch"; */

const EditProfile = () => {
  const [userData, setUserData] = useState("");

  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [img, setImg] = useState("");
  const [updatedImg, setUpdatedImg] = useState("");

  const [idForUpdate, setIdForUpdate] = useState();

  var idForUpdateForm = localStorage.getItem("newuserid");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const inpFile = document.getElementById("inpFile");

  useEffect(() => {
    setIdForUpdate(idForUpdateForm);
    console.log(idForUpdate);

    console.log("Update Page ID: " + idForUpdate);

    let url = new URL("https://rone111.herokuapp.com/user_details");
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
      setUserData(data);
      setImg(data.img);
      setName(data.name);
      setProfession(data.proff);
      setLocation(data.location);
      setBio(data.bio);
      setEmail(data.email);
      setAddress(data.address);
    };

    if (idForUpdate !== "" && idForUpdate !== undefined) {
      getUser();
    } else {
      console.log("error: idForUpdate not found or null");
    }
  }, [idForUpdate]);

  const storeValues = () => {
    setName(document.getElementById("name").value);
    setProfession(document.getElementById("profession").value);
    setBio(document.getElementById("bio").value);
    setLocation(document.getElementById("location").value);
    setAddress(document.getElementById("address").value);
    setEmail(document.getElementById("email").value);
  };

  async function updatePhoto() {
    document.getElementById("loaderImage").style.display = "block";
    const endpoint = "https://rone111.herokuapp.com/profile_upload-file";

    let url = new URL(endpoint);
    url.search = new URLSearchParams({
      user_id: idForUpdate,
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", inpFile.files[0]);

    await axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        if (data.Result === "OK") {
          document.getElementById("loaderImage").style.display = "none";
          setUpdatedImg(data.path);
        } else {
          console.log("failed update Profile");
        }
      })
      .catch(console.error);
  }

  async function updateProfile() {
    console.log(name);
    console.log(email);
    console.log(location);
    console.log(profession);
    console.log(address);
    console.log(bio);

    let url = new URL("https://rone111.herokuapp.com/updat_user__details");

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
      console.log("ok");
      window.location.href = "/profile";
    } else {
      console.log("error no status code 200");
    }
  }

  useEffect(() => {
    if (email !== "") {
      let isEmail = email.includes("@") && email.includes(".com");
      if (isEmail) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    }
  }, [email]);

  const updateClick = () => {
    let isEmail = email.includes("@") && email.includes(".com");
    if (isEmail) {
      document.getElementById("errorMobile").style.display = "none";
    } else {
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML = "Enter a valid Email";
    }
    if (isEmailValid) {
      updateProfile();
    }
  };

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
            <p className="themesSettings titleHeaderlink">Themes</p>
          </div>
          <div className="profileImageContainer__form__update">
            <div
              className="imageUpdateContainer"
              style={{
                backgroundImage: `url(${img !== "" ? img : updatedImg})`,
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
                onChange={updatePhoto}
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
                  <input type="text" placeholder="Enter your Instagram link" />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={youtube} alt="" />
                  <input type="text" placeholder="Enter your Youtube link" />
                </div>
                <div className="socialLinksinputContainer">
                  <img src={telegram} alt="" />
                  <input type="text" placeholder="Enter your Telegram link" />
                </div>
                <div id="errorContainer" className="errorContainer">
                  <p id="errorMobile">Enter a valid Email</p>
                </div>
                <div onClick={updateClick} className="updateProfileButton">
                  UPDATE
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footerContainerProfileSettings">
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;

/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "../assets/user.png";
import logo from "../assets/Logo1.svg";
import photoIcon from "../assets/image.svg";
import "./AuthStyles.css";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import "./UserDetails.css";
import SyncLoader from "react-spinners/SyncLoader";

function UserDetails() {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const [username, setUserName] = useState("");
  const [usermob, setUsermob] = useState("");
  const [userid, setUserId] = useState("");

  const [img, setImg] = useState("");

  const [isProfilePhotoUploaded, setIsProfilePhotoUploaded] = useState(false);

  const inpFile = document.getElementById("inpFile");

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
    var newName = localStorage.getItem("username");
    setUserName(newName);
    var newMob = localStorage.getItem("usermob");
    setUsermob(newMob);
    var newid = localStorage.getItem("newuserid");
    setUserId(newid);
  }, []);

  const storeValues = () => {
    setEmail(document.getElementById("email").value);
    setLocation(document.getElementById("location").value);
    setAddress(document.getElementById("address").value);
    setBio(document.getElementById("bio").value);
    setProfession(document.getElementById("profession").value);
  };

  async function uploadPhoto() {
    document.getElementById("loaderImage").style.display = "block";
    const endpoint = "https://rone111.herokuapp.com/profile_upload-file";

    let url = new URL(endpoint);
    url.search = new URLSearchParams({
      user_id: userid,
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
          setImg(data.path);
          setIsProfilePhotoUploaded(true);
        } else {
          setIsProfilePhotoUploaded(false);
        }
      })
      .catch(console.error);
  }

  async function saveProfile() {
    console.log(email);
    console.log(location);
    console.log(profession);
    console.log(address);
    console.log(bio);

    let url = new URL("https://rone111.herokuapp.com/user__details");

    url.search = new URLSearchParams({
      user_id: userid,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_id: email,
        location: location,
        address: address,
        profession: profession,
        bio: bio,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      console.log("ok");
      if (isProfilePhotoUploaded) {
        localStorage.setItem("newuserid", userid);
        window.location.href = "/profile";
      } else {
        console.log("No profile pic");
      }
    } else {
      console.log("error no status code 200");
    }
  }

  return (
    <div className="userDetails">
      <div className="header__userDetails">
        <div className="header__left">
          <div>
            <img className="header__logo" src={logo} alt="Rone Logo" />
          </div>
        </div>
        <div className="header__right">
          {/* <Link to="/">
            <SecondaryButton content="Register" />
          </Link>
          <Link className="loginButton__container" to="/login">
            <PrimaryButton content="Login" />
          </Link> */}
        </div>
      </div>
      <div className="title__container__userDetails">
        <h2>Create Profile</h2>
      </div>
      <div className="userDetailsContainer">
        <div className="userImage__container__userDetails">
          <div
            className="userImage"
            style={{ backgroundImage: `url(${img !== "" ? img : user})` }}
          >
            <div className="loader__container" id="loaderImage">
              <SyncLoader color="#d52a33" />
            </div>
          </div>
          <div className="choosePhoto__Button__userDetails">
            <input
              type="file"
              name="file"
              id="inpFile"
              accept=".png"
              onChange={uploadPhoto}
            />
            <img src={photoIcon} alt="" />
            Choose Photo
          </div>
        </div>
        <form autoComplete="off" className="form">
          <fieldset className="input__container">
            <legend>Name</legend>
            <div className="input__box">
              <input
                type="text"
                name="username"
                onChange={storeValues}
                value={username}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Mobile Number</legend>
            <div className="input__box">
              <input
                type="tel"
                name="mobile"
                onChange={storeValues}
                value={usermob}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Email</legend>
            <div className="input__box">
              <input
                id="email"
                type="email"
                name="email"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Location</legend>
            <div className="input__box">
              <input
                id="location"
                type="text"
                name="location"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Profession</legend>
            <div className="input__box">
              <input
                id="profession"
                type="text"
                name="profession"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Address</legend>
            <div className="input__box">
              <input
                id="address"
                type="text"
                name="address"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Bio</legend>
            <div className="input__box__textArea">
              <textarea
                name="bio"
                id="bio"
                cols="10"
                rows="3"
                onChange={storeValues}
              ></textarea>
            </div>
          </fieldset>
          <div id="errorContainer" className="errorContainer">
            <p id="errorName">Enter a valid Email</p>
            <p id="errorMobile">Enter a valid Mobile Number</p>
          </div>
          <div onClick={saveProfile} className="saveProfileButton">
            SAVE PROFILE
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;

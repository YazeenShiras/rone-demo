import React, { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import user from "../assets/user.svg";
import logo from "../assets/Logo1.svg";
import photoIcon from "../assets/image.svg";
import "./AuthStyles.css";
import "./UserDetails.css";
import SyncLoader from "react-spinners/SyncLoader";
import PulseLoader from "react-spinners/PulseLoader";
import Resizer from "react-image-file-resizer";

function UserDetails() {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");

  const [allStates, setstates] = useState("")
  const [city, setCity] = useState("")

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPinCode] = useState("");

  const [name, setName] = useState("")
  const [username, setUserName] = useState("");
  const [usermob, setUsermob] = useState("");
  const [userid, setUserId] = useState("");

  const [imageFile, setImageFile] = useState("");

  const [isdetails, setIsdetails] = useState(false);

  const [isProfilePhotoUploaded, setIsProfilePhotoUploaded] = useState(false);


  const Countries = Country.getAllCountries().map((country) => {
    return <option key={country.isoCode} value={[country.isoCode,country.name]}>{country.name}</option>
  })

  const handleCountry = (e) => {
      const code = e.target.value.split(",")
      const countryName = code[1]
      setCountry(countryName)
    const States = State.getAllStates().filter((state) => {
      return state.countryCode === code[0]
    })
    setstates(States)
  }

  let States;
  if (allStates) {
    States = allStates.map((state) => {
      return <option key={state.isoCode} value={[state.isoCode,state.name]}>{state.name}</option>
    })
  }

  const handlestate = (e) => {
    const code = e.target.value.split(",")
    const stateName = code[1]
    setState(stateName)
    const city = City.getAllCities().filter((city) => {
      return city.stateCode === code[0]
    })
     setCity(city)
  }


  let cities;
  if (city) {
    cities = city.map((city) => {
      return <option key={city.id} value={city.name}>{city.name}</option>
    })
  }

  const handlecity = (e) => {
    setDistrict(e.target.value)
    console.log(e.target.value)
  }

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
            setIsProfilePhotoUploaded(true);
          },
          "base64",
          200,
          200
        );
        console.log(imageFile);
      } catch (err) {
        console.log(err);
        setIsProfilePhotoUploaded(false);
      }
    }
  };

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
    var nameNew = localStorage.getItem("name");
    setName(nameNew)
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
    setBio(document.getElementById("bio").value);
    setProfession(document.getElementById("profession").value);
    setPinCode(document.getElementById("pincode").value);
  };

  async function uploadPhoto() {
    console.log(userid);
    document.getElementById("loaderImage").style.display = "block";
    const endpoint = "https://ronecard.herokuapp.com/profile_upload_url";

    let url = new URL(endpoint);
    url.search = new URLSearchParams({
      user_id: userid,
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
    if (data.Result === "OK") {
      document.getElementById("loaderImage").style.display = "none";
    }
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
    if (data.status === 200) {
      setIsProfilePhotoUploaded(true);
    }
  }

  async function saveProfile() {
    uploadPhoto();
    saveAddress();
    if (isProfilePhotoUploaded) {
      document.getElementById("saveProfileLoader").style.display = "block";
      document.getElementById("saveProfileText").style.display = "none";
      console.log(email);
      console.log(location);
      console.log(profession);
      console.log(bio);
      console.log(country);
      console.log(state);
      console.log(district);
      console.log(pincode);

      console.log(userid);

      let url = new URL("https://ronecard.herokuapp.com/user__details");

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
          address: "",
          profession: profession,
          bio: bio,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        localStorage.setItem("newuserid", userid);
        document.getElementById("saveProfileLoader").style.display = "none";
        document.getElementById("saveProfileText").style.display = "block";
        window.location.href = "/profile";
      }
    } else {
      document.getElementById("saveProfileLoader").style.display = "none";
      document.getElementById("saveProfileText").style.display = "block";
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Please upload profile photo";
    }
  }

  useEffect(() => {
    if (email !== "") {
      let isEmail = email.includes("@") && email.includes(".com");
      if (isEmail) {
        setIsdetails(true);
      } else {
        setIsdetails(false);
      }
      if (location !== "") {
        setIsdetails(true);
        if (profession !== "") {
          setIsdetails(true);
          setIsdetails(true);
          if (bio !== "") {
            setIsdetails(true);
            if (country !== "") {
              setIsdetails(true);
              if (state !== "") {
                setIsdetails(true);
                if (district !== "") {
                  setIsdetails(true);
                  if (pincode !== "") {
                    setIsdetails(true);
                  }
                }
              }
            }
          }
        }
      }
    }
  }, [email, location, bio, profession, country, state, district, pincode]);

  const saveClick = () => {
    if (
      email === "" ||
      location === "" ||
      profession === "" ||
      bio === "" ||
      country === "" ||
      country === undefined ||
      state === undefined ||
      district === undefined ||
      state === "" ||
      district === "" ||
      pincode === ""
    ) {
      setIsdetails(false);
      document.getElementById("errorMobile").style.display = "block";
      document.getElementById("errorMobile").innerHTML =
        "Must fill all *Required fields";
    } else {
      let isEmail = email.includes("@") && email.includes(".com");
      if (isEmail) {
        document.getElementById("errorMobile").style.display = "none";
      } else {
        document.getElementById("errorMobile").style.display = "block";
        document.getElementById("errorMobile").innerHTML =
          "Enter a valid Email";
      }
      if (isdetails) {
        saveProfile();
      }
    }
  };

  return (
    <div className="userDetails">
      <div className="header__userDetails">
        <div className="header__left">
          <div>
            <img className="header__logo" src={logo} alt="Rone Logo" />
          </div>
        </div>
        <div className="header__right"></div>
      </div>
      <div className="title__container__userDetails">
        <h2>Create Profile</h2>
      </div>
      <div className="userDetailsContainer">
        <div className="userImage__container__userDetails">
          <div
            className="userImage"
            style={{
              backgroundImage: `url(${imageFile !== "" ? imageFile : user})`,
            }}
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
              onChange={fileChangedHandler}
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
                value={name}
                readOnly
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
                readOnly
              />
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Email*</legend>
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
            <legend>Profession*</legend>
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
            <legend>Bio*</legend>
            <div className="input__box__textArea">
              <textarea
                name="bio"
                id="bio"
                cols="10"
                rows="3"
                maxLength="250"
                onChange={storeValues}
              ></textarea>
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Location*</legend>
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
            <legend>Country*</legend>
            <div className="input__box">
            <select onClick={handleCountry}>
              <option selected>Select Country</option>
              {Countries}
            </select>
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>State*</legend>
            <div className="input__box">
            <select onClick={handlestate}>
              <option selected>Select State</option>
              {States ? States : ""}
            </select>
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>City*</legend>
            <div className="input__box">
            <select onClick={handlecity}>
              <option selected>Select City</option>
              {cities ? cities : ""}
            </select>
            </div>
          </fieldset>
          <fieldset className="input__container">
            <legend>Pincode*</legend>
            <div className="input__box">
              <input
                id="pincode"
                type="text"
                name="pincode"
                onChange={storeValues}
              />
            </div>
          </fieldset>
          <div id="errorContainer" className="errorContainer">
            <p id="errorMobile">Enter a valid Email</p>
          </div>
          <div onClick={saveClick} className="saveProfileButton">
            <div className="loader__container__login" id="saveProfileLoader">
              <PulseLoader color="#ffffff" />
            </div>
            <p id="saveProfileText">SAVE PROFILE</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;

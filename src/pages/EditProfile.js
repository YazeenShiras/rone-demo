import React, { useRef, useState } from "react";
import axios from "axios";

function EditPage() {
  const [data, setData] = useState({
    username: "",
    mobile: "",
    location: "",
    email: "",
    profession: "",
    address: "",
    bio: "",
    image: "",
  });
  const fileInput = useRef();

  const handleDetails = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const selectFile = () => {
    fileInput.current.click();
  };
  const handleFile = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.files[0],
    });
  };
  console.log(data);

  const saveProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", data.image);
    formData.append("username", data.username);
    formData.append("mobile", data.mobile);
    formData.append("email", data.email);
    formData.append("location", data.location);
    formData.append("address", data.address);
    formData.append("profession", data.profession);
    formData.append("bio", data.bio);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post("https://git.heroku.com/rone-project-testing.git", formData, config)
      .then((response) => {
        setData(response.data);
      });
  };
  return (
    <>
      <div className="w-full h-screen bg-red-500">
        <div className="grid grid-cols-4 grid-rows-auto m-14 h-auto bg-white border-t-2 shadow-lg ">
          <div className="col-span-1 border-r">
            <div className="flex flex-col items-center mt-20 relative">
              <img
                className="rounded-full w-52 h-52"
                src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1647249227~hmac=986511ed4a16c1d5c45161f5ac88ce31"
                alt=""
              />
              <span className="m-2 font-semibold">userName</span>
              <input
                type="file"
                name="image"
                className="mt-5 ml-5"
                ref={fileInput}
                onChange={handleFile}
                hidden
                accept=".png, .jpg, .jpeg"
              />
              <button
                className="px-4 py-2 font-semibold border-2 border-red-500 hover:bg-red-500 hover:text-white"
                onClick={selectFile}
              >
                Upload new Picture
              </button>
            </div>
          </div>
          <div className="col-span-2 max-w-full m-3 text-center">
            <div className="mt-8">
              <h1 className=" text-3xl font-bold">Profile Settings</h1>
            </div>
            <div className="mt-20 flex flex-col items-center">
              <input
                type="text"
                name="username"
                placeholder="Name"
                className="w-96 h-10 border-2 p-2"
                onChange={handleDetails}
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                className="mt-5 w-96 h-10 border-2 p-2"
                onChange={handleDetails}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="mt-5 w-96 h-10 border-2 p-2"
                onChange={handleDetails}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="mt-5 w-96 h-10 border-2 p-2"
                onChange={handleDetails}
              />
              <input
                type="text"
                name="profession"
                placeholder="Profession"
                className="mt-5 w-96 h-10 border-2 p-2"
                onChange={handleDetails}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="mt-5 w-96 h-10 border-2 p-2"
                onChange={handleDetails}
              />
              <textarea
                name="bio"
                id=""
                cols="10"
                rows="3"
                className="border-2 w-96 mt-5 p-2"
                placeholder="Bio"
                onChange={handleDetails}
              ></textarea>

              <button
                className="mt-8 px-8 py-1 bg-red-500 text-white text-xl font-semibold hover:bg-black "
                onClick={saveProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPage;

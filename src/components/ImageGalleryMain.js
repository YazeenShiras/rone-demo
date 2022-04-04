/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import ClockLoader from "react-spinners/ClipLoader";
import "./ImageGalleryMain.css";
import sort from "../assets/sort.svg";
import image from "../assets/image.svg";
/* import Resizer from "react-image-file-resizer"; */

const ImageGalleryMain = () => {
  /*  const [imageFile, setImageFile] = useState(""); */

  const [idForImg, setIdForImg] = useState("");
  const [imgtest, setImgtest] = useState("");
  const [allImages, setAllImages] = useState([]);

  const inpFile = document.getElementById("inpFile");
  var idForImageGallery = localStorage.getItem("newuserid");

  /* const fileChangedHandler = (event) => {
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
      } catch (err) {
        console.log(err);
      }
    }
  }; */

  useEffect(() => {
    setIdForImg(idForImageGallery);
    console.log(idForImg);
  }, [idForImg]);

  useEffect(() => {
    async function getAllImages() {
      console.log("access to getAllImages");
      const endpoint = "https://rone111.herokuapp.com/access_image_gallery";

      let url = new URL(endpoint);
      url.search = new URLSearchParams({
        user_id: idForImg,
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

    if (idForImg !== "" && idForImg !== undefined) {
      getAllImages();
    }
  }, [idForImg, imgtest]);

  async function uploadPhotofromFiles() {
    console.log("access to UploadPhotofromFiles");
    document.getElementById("selectFromFileContainer").style.display = "flex";

    const endpoint = "https://rone111.herokuapp.com/self_upload-file";

    let url = new URL(endpoint);
    url.search = new URLSearchParams({
      user_id: idForImg,
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", inpFile.files[0]);

    console.log(formData);

    await axios.post(url, formData, config).then((res) => {
      const data = res.data;
      console.log(data);
      if (data.Result === "OK") {
        document.getElementById("selectFromFileContainer").style.display =
          "none";
        setImgtest(data.path);
      }
    });
  }

  const confirmFetch = () => {
    console.log("access to confirmFetch");
    if (idForImg !== "") {
      uploadPhotofromFiles();
    }
  };

  /* const loadMore = () => {
    var loadMoreButton = document.getElementById("loadMore__button");
    var loadMoreContainer = document.getElementById("loadmoreContainer");
    if (loadMoreButton.innerHTML === "Show Less") {
      loadMoreContainer.style.display = "none";
      loadMoreButton.innerHTML = "Load More";
    } else {
      loadMoreContainer.style.display = "flex";
      loadMoreButton.innerHTML = "Show Less";
    }
  }; */

  return (
    <div className="imageGalleryMain">
      <div className="title__container__imageGalleryMain">
        <h3>Image Gallery</h3>
        <div className="viewAll__button">View All</div>
        <span></span>
        <div className="sort__button">
          Sort
          <img src={sort} alt="" />
        </div>
      </div>
      <div className="buttonContainer__imageGallery">
        <div className="AddPhotosButton">
          <input
            name="file"
            id="inpFile"
            accept=".png"
            type="file"
            onChange={confirmFetch}
          />
          <img src={image} alt="" />
          Choose Photo
        </div>
        {/* <img className="displayImageForUpload" src={imageFile} alt="" />
        <div className="UploadToImageGalleryButton" onClick={confirmFetch}>
          Upload To Image Gallery
        </div> */}
      </div>

      <div className="selectFromFile__container" id="selectFromFileContainer">
        <div className="loading__animation" id="loadingAnimation">
          <ClockLoader size={30} color="#d52a33" />
          <p> Uploading...</p>
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
      {/* <div
        id="loadmoreContainer"
        className="loadMore__contaner__imageContainer"
      >
        <div className="extendedImageGalleryContainer">
          {photos.map((photo) => {
            console.log(photo);
            return (
              <div
                key={photo.id}
                style={{
                  backgroundColor: photo.color,
                  backgroundImage: `url(${photo.urls.full})`,
                }}
                className="imageCard__imageGallery"
              >
                <h4>{photo.title}</h4>
              </div>
            );
          })}
        </div>
      </div> */}
      <div className="buttonContainer__imageContainer">
        <div id="loadMore__button" className="loadMore__button">
          Load More
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryMain;

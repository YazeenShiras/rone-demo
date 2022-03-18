/* eslint-disable no-unused-vars */
import "./ImageGalleryMain.css";
import sort from "../assets/sort.svg";
import image from "../assets/image.svg";
import searchIcon from "../assets/searchIcon.svg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img10 from "../assets/images/img10.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const ImageGalleryMain = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [browse, setBrowse] = useState([]);
  const [page, setPage] = useState(1);

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=jlSQhIiSODwibS2U8gwvnjJCYsWdwXs8-2jpyRRvn8c`;

  const loadMore = () => {
    var loadMoreButton = document.getElementById("loadMore__button");
    var loadMoreContainer = document.getElementById("loadmoreContainer");
    if (loadMoreButton.innerHTML === "Show Less") {
      loadMoreContainer.style.display = "none";
      loadMoreButton.innerHTML = "Load More";
    } else {
      loadMoreContainer.style.display = "flex";
      loadMoreButton.innerHTML = "Show Less";
    }
  };

  const storeSearchInput = () => {
    setSearch(document.getElementById("searchInput").value);
  };

  const viewBrowsePhoto = () => {
    document.getElementById("browseImageContainer").style.display = "flex";
  };

  const getBrowseData = () => {
    document.getElementById("imagePageButtonConatiner").style.display = "flex";
    const getData = async () => {
      await axios
        .get(url)
        .then((response) => {
          setBrowse(response.data.results);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  };

  const nextClick = () => {
    setPage(page + 1);
    if (page !== 0 && page <= 5) {
      getBrowseData();
    }
  };

  const prevClick = () => {
    setPage(page - 1);
    if (page !== 0 && page <= 5) {
      getBrowseData();
    }
  };

  return (
    <div className="imageGalleryMain">
      <div className="buttonContainer__imageGallery">
        <div className="AddPhotosButton">
          <input type="file" />
          <img src={image} alt="" />
          Choose Photo
        </div>
        <div onClick={viewBrowsePhoto} className="BrowsePhotoButton">
          <img src={image} alt="" />
          Browse Photo
        </div>
      </div>
      <div className="browseImageContainer" id="browseImageContainer">
        <div className="searchBox__container">
          <input
            id="searchInput"
            type="text"
            placeholder="Search Photos for Image Gallery"
            onChange={storeSearchInput}
          />
          <img onClick={getBrowseData} src={searchIcon} alt="" />
        </div>
        <div
          className="cardsContainer__imageBrowse"
          id="cardsContainerimageBrowse"
        >
          {browse.map((img) => {
            return (
              <div
                key={img.id}
                style={{
                  backgroundColor: img.color,
                  backgroundImage: `url(${img.urls.full})`,
                }}
                className="card__image"
              >
                <div className="selectButton__image">Select</div>
              </div>
            );
          })}
        </div>
        <div
          className="imagePageButton__conatiner"
          id="imagePageButtonConatiner"
        >
          <div onClick={prevClick} className="AddPhotosButton pageChange">
            Previous
          </div>
          <div className=" BrowsePhotoButton pageChange" onClick={nextClick}>
            Next
          </div>
        </div>
      </div>
      <div className="title__container__imageGalleryMain">
        <h3>Image Gallery</h3>
        <div className="viewAll__button">View All</div>
        <span></span>
        <div className="sort__button">
          Sort
          <img src={sort} alt="" />
        </div>
      </div>
      <div className="content__container__imageGalleryMain">
        <div className="left__imageContainer__content__imageContainer">
          <div
            className="mainCard__imageContainer"
            style={{ backgroundImage: `url('${img10}')` }}
          >
            <h3>Lorem Ipsum is simply dummy text of the printing.</h3>
          </div>
        </div>
        <div className="right__imageContainer__content__imageContainer">
          <div
            style={{ backgroundImage: `url('${img2}')` }}
            className="card__products__imageContainer"
          >
            <h4>Lorem Ipsum is simply dummy text of the</h4>
          </div>
          <div
            style={{ backgroundImage: `url('${img3}')` }}
            className="card__products__imageContainer"
          >
            <h4>Lorem Ipsum is simply dummy text of the</h4>
          </div>
          <div
            style={{ backgroundImage: `url('${img4}')` }}
            className="card__products__imageContainer"
          >
            <h4>Lorem Ipsum is simply dummy text of the</h4>
          </div>
          <div
            style={{ backgroundImage: `url('${img5}')` }}
            className="card__products__imageContainer"
          >
            <h4>Lorem Ipsum is simply dummy text of the</h4>
          </div>
        </div>
      </div>
      <div
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
      </div>
      <div className="buttonContainer__imageContainer">
        <div
          onClick={loadMore}
          id="loadMore__button"
          className="loadMore__button"
        >
          Load More
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryMain;

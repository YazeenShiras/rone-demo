/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Products.css";
import sort from "../assets/sort.svg";
import union from "../assets/union.svg";
import image from "../assets/image.svg";
import axios from "axios";
import { ClockLoader } from "react-spinners";

const Products = () => {
  const [productsId, setProductsId] = useState("");
  const [isImage, setIsImage] = useState("false");
  const [isResponse, setIsResponse] = useState("");

  const [resImgUrl, setResImgUrl] = useState("");
  const [resImgId, setResImgId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [allProducts, setAllProducts] = useState([]);

  var idForProducts = localStorage.getItem("newuserid");

  const inpFile = document.getElementById("inpFileProduct");

  const storeValues = () => {
    setName(document.getElementById("productName").value);
    setPrice(document.getElementById("price").value);
    setDescription(document.getElementById("description").value);
  };

  useEffect(() => {
    setProductsId(idForProducts);
    console.log(productsId);
  }, [productsId]);

  useEffect(() => {
    async function getAllProducts() {
      console.log("access to getAllProducts");
      const endpoint = "https://testdatassz.herokuapp.com/products";

      let url = new URL(endpoint);
      url.search = new URLSearchParams({
        user_id: productsId,
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
          if (data.data) {
            setAllProducts(data.data);
            console.log(allProducts);
          }
        })
        .catch(console.error);
    }

    if (productsId !== "" && productsId !== undefined) {
      getAllProducts();
    }
  }, [productsId, isResponse]);

  async function uploadProductImage() {
    document.getElementById("loadingAnimationproducts").style.display = "flex";
    console.log(productsId);

    const url = "https://testdatassz.herokuapp.com/products_img";

    const formData = new FormData();
    formData.append("file", inpFile.files[0]);

    await axios
      .post(url, formData)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data) {
          setIsImage(true);
          setResImgUrl(data.img_url);
          setResImgId(data.img_public_id);
          document.getElementById("resImageProduct").style.display = "block";
          document.getElementById("loadingAnimationproducts").style.display =
            "none";
        }
      })
      .catch(console.error);
  }

  const confirmFetch = () => {
    console.log("access to confirmFetch");
    console.log(productsId);
    if (productsId !== "") {
      uploadProductImage();
    }
  };

  async function productDetails() {
    let url = new URL("https://testdatassz.herokuapp.com/products");

    url.search = new URLSearchParams({
      user_id: productsId,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: name,
        product_decsription: description,
        product_price: price,
        img_url: resImgUrl,
        img_public_id: resImgId,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.data) {
      setIsResponse(true);
      document.getElementById("formContainerProductAdd").style.display = "none";
      document.getElementById("addProductsButtonFirst").style.display = "flex";
    }
  }

  const addProducts = () => {
    console.log("add products");
    if (isImage) {
      console.log("image included");
      productDetails();
    }
  };

  const addProductButtonClick = () => {
    document.getElementById("formContainerProductAdd").style.display = "flex";
    document.getElementById("addProductsButtonFirst").style.display = "none";
  };

  return (
    <div className="products">
      <div className="title__container__products">
        <h3>Products</h3>
        <div className="viewAll__button">View All</div>
        <span></span>
        <div className="sort__button">
          Sort
          <img src={sort} alt="" />
        </div>
      </div>
      <div className="productsAddContainer">
        <div
          className="addProduct__Button"
          id="addProductsButtonFirst"
          onClick={addProductButtonClick}
        >
          <img src={union} alt="" />
          Add Products
        </div>

        <div className="formContainer__productAdd" id="formContainerProductAdd">
          <div
            className="loading__animationProducts"
            id="loadingAnimationproducts"
          >
            <ClockLoader size={20} color="#d52a33" />
            <p> Loading...</p>
          </div>
          <img id="resImageProduct" src={resImgUrl} alt="" />
          <div className="AddPhotosButton">
            <input
              name="fileProduct"
              id="inpFileProduct"
              accept=".png"
              type="file"
              onChange={confirmFetch}
            />
            <img src={image} alt="" />
            Choose Photo
          </div>
          <form autoComplete="off" className="form">
            <fieldset className="input__container">
              <legend>Product Name</legend>
              <div className="input__box">
                <input
                  type="text"
                  name="name"
                  id="productName"
                  onChange={storeValues}
                />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Product Price</legend>
              <div className="input__box">
                <input
                  id="price"
                  type="text"
                  name="price"
                  onChange={storeValues}
                />
              </div>
            </fieldset>
            <fieldset className="input__container">
              <legend>Product Description</legend>
              <div className="input__box__textArea">
                <textarea
                  name="description"
                  id="description"
                  cols="10"
                  rows="3"
                  onChange={storeValues}
                ></textarea>
              </div>
            </fieldset>
            <div id="errorContainer" className="errorContainer">
              <p id="errorMobile">Please include all product details</p>
            </div>
            <div onClick={addProducts} className="saveProfileButton">
              <p id="addProductText">ADD PRODUCT</p>
            </div>
          </form>
        </div>
      </div>
      <div className="productsCard__container">
        {allProducts.map((product, index) => {
          return (
            <div className="productCard" key={index}>
              <div className="imageContainer__productCard">
                <img src={product.img_url} alt="" />
              </div>
              <div className="productDetails__container__profileCard">
                <h3>{product.product_name}</h3>
                <p>{product.product_decsription}</p>
                <h4>₹{product.product_price}</h4>
                <div className="buttonsContainer__productCard">
                  <div className="sendEnquiry__button">Send Enquiry</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;

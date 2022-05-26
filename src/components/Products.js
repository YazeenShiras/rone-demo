/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import "./Products.css";
import sort from "../assets/sort.svg";
import union from "../assets/union.svg";
import image from "../assets/image.svg";
import deleteIcon from "../assets/delete.svg";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import Resizer from "react-image-file-resizer";

const Products = () => {
  const [productsId, setProductsId] = useState("");
  const [isResponse, setIsResponse] = useState("");

  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [allProducts, setAllProducts] = useState([]);

  const [imageURI, setImageURI] = useState("");

  var idForProducts = localStorage.getItem("newuserid");

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
            setImageURI(uri);
            document.getElementById("resImageProduct").style.display = "block";
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

  useEffect(() => {
    setProductsId(idForProducts);
    console.log(productsId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsId]);

  useEffect(() => {
    async function getAllProducts() {
      console.log("access to getAllProducts");
      const endpoint = "https://ronedcard.herokuapp.com/products";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsId, isResponse]);

  useEffect(() => {
    const getSocial = async () => {
      let socialUrl = new URL(
        "https://ronedcard.herokuapp.com/get_social_links"
      );
      socialUrl.search = new URLSearchParams({
        user_id: productsId,
      });

      const req = await fetch(socialUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      console.log(data.data.fb_link);
      setWhatsappNumber(data.data.whatssapp_link);
    };

    if (productsId !== "" && productsId !== undefined) {
      getSocial();
    }
  }, [productsId]);

  const storeValues = () => {
    setName(document.getElementById("productName").value);
    setPrice(document.getElementById("price").value);
    setDescription(document.getElementById("description").value);
  };

  async function addProduct() {
    let url = new URL("https://ronedcard.herokuapp.com/products");

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
        img_url: imageURI,
        img_public_id: "null",
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.data) {
      setIsResponse(true);
      document.getElementById("formContainerProductAdd").style.display = "none";
      document.getElementById("addProductsButtonFirst").style.display = "flex";
      window.location.reload();
    }
  }

  const addProductButtonClick = () => {
    document.getElementById("formContainerProductAdd").style.display = "flex";
    document.getElementById("addProductsButtonFirst").style.display = "none";
  };

  async function deleteProduct(deleteId) {
    let url = new URL("https://ronedcard.herokuapp.com/products_delete");

    url.search = new URLSearchParams({
      product_id: deleteId,
    });

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      window.location.reload();
    }
  }

  const sureDelete = (deleteId) => {
    let confirmAction = confirm("Are you sure to Delete?");
    if (confirmAction) {
      deleteProduct(deleteId);
    }
  };

  return (
    <div className="products" id="products">
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
          <img id="resImageProduct" src={imageURI} alt="" />
          <div className="AddPhotosButton">
            <input
              name="fileProduct"
              id="inpFileProduct"
              accept=".png"
              type="file"
              onChange={fileChangedHandler}
            />
            <img src={image} alt="" />
            Choose Photo
          </div>
          <form autoComplete="off" className="form">
            <fieldset className="input__container">
              <legend>Product Name</legend>
              <div className="input__box">
                <input
                  maxLength="25"
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
                  maxLength="8"
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
                  maxLength="50"
                  onChange={storeValues}
                ></textarea>
              </div>
            </fieldset>
            <div id="errorContainer" className="errorContainer">
              <p id="errorMobile">Please include all product details</p>
            </div>
            <div onClick={addProduct} className="saveProfileButton">
              <p id="addProductText">ADD PRODUCT</p>
            </div>
          </form>
        </div>
      </div>
      <div className="productsCard__container">
        {allProducts
          .slice(0)
          .reverse()
          .map((product, index) => {
            return (
              <div className="productCard" key={index}>
                <div className="top__productCard">
                  <div className="imageContainer__productCard">
                    <img src={product.img_url} alt="" />
                  </div>
                  <div className="productDetails__container__profileCard">
                    <h3>{product.product_name}</h3>
                    <p>{product.product_decsription}</p>
                    <h4>₹ {product.product_price}</h4>
                  </div>
                </div>
                <div className="buttonsContainer__productCard">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=I%20would%20like%20to%20learn%20more%20about%20${product.product_name}%20(product)%20on%20ronedcard.com`}
                    className="sendEnquiry__button"
                  >
                    Send Enquiry
                  </a>
                  <div
                    className="menuContainer"
                    onClick={() => sureDelete(product.id)}
                  >
                    <div className="deleteButton">
                      <img src={deleteIcon} alt="" />
                      <p>Delete</p>
                    </div>
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

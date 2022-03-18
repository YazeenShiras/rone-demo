import React from "react";
import "./Products.css";
import sort from "../assets/sort.svg";
import union from "../assets/union.svg";
import shareRed from "../assets/shareRed.svg";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";

const Products = () => {
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
      <div className="productsCard__container">
        <div className="addproduct">
          <div className="addProduct__Button">
            <img src={union} alt="" />
            Add Products
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product1} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product2} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product3} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product4} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product3} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product1} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="productCard">
          <div className="imageContainer__productCard">
            <img src={product2} alt="" />
          </div>
          <div className="productDetails__container__profileCard">
            <h3>Product Name</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <h4>₹500</h4>
            <div className="buttonsContainer__productCard">
              <div className="sendEnquiry__button">Send Enquiry</div>
              <div className="shareButton__productCard">
                <img src={shareRed} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loadMore__contaner__products">
        <div className="buttonContainer__products">
          <div className="loadMore__button">Load More</div>
        </div>
      </div>
    </div>
  );
};

export default Products;

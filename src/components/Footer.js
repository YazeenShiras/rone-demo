import React from "react";
import "./Footer.css";
import logo from "../assets/Logo1.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left__footer__container">
        <div className="logo__footer">
          <img src={logo} alt="" />
        </div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="right__footer__container">
        <div className="left__footerLinks__container LinksContainer__footer">
          <h4>What we provide</h4>
          <ul>
            <li>
              <span>
                <a href="/">Home</a>
              </span>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
        <div className="leftCenter__footerLinks__container LinksContainer__footer">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Legal</a>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
        <div className="rightCenter__footerLinks__container LinksContainer__footer">
          <h4>Policies</h4>
          <ul>
            <li>
              <a href="/">Legal</a>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
        <div className="right__footerLinks__container LinksContainer__footer">
          <h4>What arclif provides</h4>
          <ul>
            <li>
              <a href="/">Legal</a>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

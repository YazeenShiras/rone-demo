import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./QrScan.css";
import bg from "../assets/settingsBg.png";
import QRCode from "react-qr-code";

const QrScan = () => {
  const [qrName, setQrName] = useState("");
  const [userid, setUserId] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    var newid = localStorage.getItem("newuserid");
    setUserId(newid);
    const name = localStorage.getItem("nameForWallet");
    setQrName(name);

    console.log("userid : " + userid);

    const endpoint = "https://ronedcard.com/profile/share";
    let originForShare = new URL(endpoint);
    originForShare.searchParams.set("id", userid);

    if (userid !== "") {
      setOrigin(originForShare.href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  return (
    <div className="settingsPage qrSettings">
      <Header />
      <div
        className="bgContainer__settings"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2>Settings</h2>
        <div className="formContainer__settings">
          <div className="titleContainer__formContainer">
            <Link
              to="/settings/profile"
              className=" titleHeaderlink mainSettings"
            >
              Profile
            </Link>
            <p className="accountSettings titleHeaderlink">Account</p>
            <Link
              to="/settings/Wallet"
              className=" titleHeaderlink walletSettings"
            >
              Wallet
            </Link>
            <Link to="/settings/QR-code" className="activeHeaderQr">
              QR Code
            </Link>
          </div>
          <div className="QrContent__container">
            <div className="qrContainer__wallet webViewConatiner">
              <QRCode
                size={300}
                level="H"
                title={`${qrName} - Rone`}
                value={origin}
              />
              <div className="shareThisqr__button scanQr__container">
                Scan QR
              </div>
            </div>
            <div className="qrContainer__wallet mobileViewConatiner">
              <QRCode
                size={200}
                level="H"
                title={`${qrName} - Rone`}
                value={origin}
              />
              <div className="shareThisqr__button scanQr__container">
                Scan QR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrScan;

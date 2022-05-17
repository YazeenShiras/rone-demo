import React from "react";
import "./Buttons.css";

const PrimaryButton = (props) => {
  return (
    <div
      onClick={
        props.content === "Log Out"
          ? localStorage.clear()
          : console.log("LOG IN")
      }
      className="primaryButton"
    >
      {props.content}
    </div>
  );
};

export default PrimaryButton;

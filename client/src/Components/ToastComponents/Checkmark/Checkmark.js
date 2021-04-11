import React from "react";
import checkmarkIcon from "../../../assets/SVG/CheckmarkIcon.svg";

import "./style.css";

const Checkmark = () => {
  return (
    <div class="animation-ctn">
      <div class="icon icon--order-success svg">
        <checkmarkIcon />
      </div>
    </div>
  );
};

export default Checkmark;

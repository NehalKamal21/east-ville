import React from "react";
import roofFloorImg from "../../assets/ARoofImage.png"; // adjust the path if needed

const ARoof: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={roofFloorImg} alt="BRoof Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default ARoof;

import React from "react";
import roofImage from "../../assets/clusterB/BRoofImage.png";

const BRoof: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={roofImage} alt="BRoof Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default BRoof;

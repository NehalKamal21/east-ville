import React from "react";
import roofFloorImg from "../../assets/clusterA/ARoofImage.png";

const ARoof: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={roofFloorImg} alt="BRoof Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default ARoof;

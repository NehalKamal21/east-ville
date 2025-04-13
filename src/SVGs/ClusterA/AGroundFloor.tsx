import React from "react";
import groundFloorImg from "../../assets/clusterA/AGroundFloorImage.png";

const AGroundFloor: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={groundFloorImg} alt="BRoof Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default AGroundFloor;

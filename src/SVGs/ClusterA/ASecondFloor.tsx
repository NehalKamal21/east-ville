import React from "react";
import seconedFloorImg from "../../assets/clusterA/ASecondFloorImage.png";

const ASecondFloor: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={seconedFloorImg} alt="BRoof Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default ASecondFloor;

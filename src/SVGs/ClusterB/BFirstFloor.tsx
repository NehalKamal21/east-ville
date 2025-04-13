import React from "react";
import firstFloor from "../../assets/clusterB/BFirstFloor.png";

const BFirstFloor: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={firstFloor} alt="BFirst Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default BFirstFloor;

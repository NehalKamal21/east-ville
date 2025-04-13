import React from "react";
import groundFloor from "../../assets/ClusterB/BGroundFloor.png";


const BGroundFloor: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={groundFloor} alt="BGround Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default BGroundFloor;

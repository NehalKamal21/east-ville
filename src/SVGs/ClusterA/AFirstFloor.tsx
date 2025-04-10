import React from "react";
import firstFloorImg from "../../assets/AFirstFloorImage.png"; // adjust the path if needed

const AFirstFloor: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={firstFloorImg} alt="BRoof Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default AFirstFloor;

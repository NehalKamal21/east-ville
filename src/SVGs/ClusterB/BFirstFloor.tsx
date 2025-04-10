import React from "react";
import firstFloor from "../../assets/BFirstFloor.png"; // adjust the path if needed

const BFirstFloor: React.FC = () => {
  return (
    <div className="fullScreenSvg">
      <img src={firstFloor} alt="BFirst Plan" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  );
};

export default BFirstFloor;

import React from "react";
import img1 from "../../assets/clusterB/BGroundFloor/image_243043a5.png";
import img2 from "../../assets/clusterB/BGroundFloor/image_a5c78742.png";
import img3 from "../../assets/clusterB/BGroundFloor/image_b4dd90e2.png";
import img4 from "../../assets/clusterB/BGroundFloor/image_c2e3d79e.png";
import img5 from "../../assets/clusterB/BGroundFloor/image_b48122a5.png";
import img6 from "../../assets/clusterB/BGroundFloor/image_1cc4b644.png";
import img7 from "../../assets/clusterB/BGroundFloor/image_8514346a.png";

const BGroundFloor: React.FC = () => {
  return (
    <svg className="fullScreenSvg" preserveAspectRatio='none'
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2880"
      height="1800"
      viewBox="0 0 2880 1800"
    >
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={img1} />
      <image  x="2117" width="606" height="1800" xlinkHref={img2} />
      <image  x="2463" y="1428" width="44" height="35" xlinkHref={img3} />
      <image  x="2552" y="1241" width="35" height="26" xlinkHref={img4} />
      <image  x="2393" y="1207" width="38" height="34" xlinkHref={img5} />
      <image  x="2376" y="819" width="33" height="35" xlinkHref={img6} />
      <image  x="2399" y="435" width="42" height="32" xlinkHref={img7} />
    </svg>
  );
};

export default BGroundFloor;

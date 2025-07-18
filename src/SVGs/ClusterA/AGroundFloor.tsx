import React from "react";
import layer0 from "../../assets/clusterA/AGroundFloor/layer_0.png";
import img1 from "../../assets/clusterA/AGroundFloor/image_b8e0f202.png";
import img2 from "../../assets/clusterA/AGroundFloor/image_e945a8f9.png";
import img3 from "../../assets/clusterA/AGroundFloor/image_dbf30445.png";
import img4 from "../../assets/clusterA/AGroundFloor/image_1313e65d.png";
import img5 from "../../assets/clusterA/AGroundFloor/image_c1dd66cb.png";
import img6 from "../../assets/clusterA/AGroundFloor/image_648b301d.png";

const AGroundFloor: React.FC = () => {
  return (
    <svg className="fullScreenSvg" xmlns="http://www.w3.org/2000/svg" width="2880" height="1800" preserveAspectRatio='none' viewBox="0 0 2880 1800">
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
      <image x="2111" width="619" height="1800" xlinkHref={img1} />
      <image x="2361" y="1448" width="38" height="28" xlinkHref={img2} />
      <image x="2511" y="1320" width="34" height="31" xlinkHref={img3} />
      <image x="2229" y="1294" width="40" height="35" xlinkHref={img4} />
      <image x="2378" y="838" width="30" height="30" xlinkHref={img5} />
      <image x="2401" y="455" width="38" height="32" xlinkHref={img6} />
    </svg>
  );
};

export default AGroundFloor;

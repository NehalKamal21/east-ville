import React from "react";
import img1 from "../../assets/clusterB/BFirstFloor/image_314ea112.png";
import img2 from "../../assets/clusterB/BFirstFloor/image_5892dcc2.png";
import img3 from "../../assets/clusterB/BFirstFloor/image_745da060.png";
import img4 from "../../assets/clusterB/BFirstFloor/image_d67bc24b.png";
import img5 from "../../assets/clusterB/BFirstFloor/image_da6c5f86.png";
import img6 from "../../assets/clusterB/BFirstFloor/image_2af9dd0a.png";
import img7 from "../../assets/clusterB/BFirstFloor/image_a12b64a6.png";
import img8 from "../../assets/clusterB/BFirstFloor/image_ec75dac7.png";

const BFirstFloor: React.FC = () => {
  return (
    <svg className="fullScreenSvg" preserveAspectRatio='none'
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2880"
      height="1800"
      viewBox="0 0 2880 1800"
    >
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={img1} />
      <image  x="2345" y="429" width="37" height="26" xlinkHref={img2} />
      <image  x="2279" y="627" width="45" height="37" xlinkHref={img3} />
      <image  x="2242" y="891" width="36" height="31" xlinkHref={img4} />
      <image  x="2255" y="1079" width="36" height="31" xlinkHref={img5} />
      <image  x="2242" y="1342" width="36" height="29" xlinkHref={img6} />
      <image  x="2414" y="1351" width="36" height="32" xlinkHref={img7} />
      <image  x="2062" width="607" height="1800" xlinkHref={img8} />
    </svg>
  );
};

export default BFirstFloor;

import React from "react";
import layer0 from "../../assets/clusterA/ASecondFloor/layer_0.png";
import img1 from "../../assets/clusterA/ASecondFloor/image_4b71cbea.png";
import img2 from "../../assets/clusterA/ASecondFloor/image_870e0f00.png";
import img3 from "../../assets/clusterA/ASecondFloor/image_d6f268d8.png";
import img4 from "../../assets/clusterA/ASecondFloor/image_7ca96e94.png";
import img5 from "../../assets/clusterA/ASecondFloor/image_069354da.png";
import img6 from "../../assets/clusterA/ASecondFloor/image_9e3ae503.png";
import img7 from "../../assets/clusterA/ASecondFloor/image_e98ed625.png";

const ASecondFloor: React.FC = () => {
  return (
    <svg className="fullScreen" preserveAspectRatio='none'
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2880"
      height="1800"
      viewBox="0 0 2880 1800"
    >
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
      <image x="2090" width="605" height="1800" xlinkHref={img1} />
      <image x="2225" y="1314" width="35" height="30" xlinkHref={img2} />
      <image x="2433" y="1304" width="49" height="36" xlinkHref={img3} />
      <image x="2273" y="968" width="32" height="26" xlinkHref={img4} />
      <image x="2252" y="771" width="39" height="30" xlinkHref={img5} />
      <image x="2323" y="661" width="40" height="35" xlinkHref={img6} />
      <image x="2372" y="451" width="41" height="28" xlinkHref={img7} />
    </svg>
  );
};

export default ASecondFloor;

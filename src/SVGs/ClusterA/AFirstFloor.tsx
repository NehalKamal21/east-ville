import React from "react";
import layer0 from "../../assets/clusterA/AFirstFloor/layer_0.png";
import img1 from "../../assets/clusterA/AFirstFloor/image_ec08d61b.png";
import img2 from "../../assets/clusterA/AFirstFloor/image_62332099.png";
import img3 from "../../assets/clusterA/AFirstFloor/image_01435b4b.png";
import img4 from "../../assets/clusterA/AFirstFloor/image_b51ca10e.png";
import img5 from "../../assets/clusterA/AFirstFloor/image_46e3e97d.png";
import img6 from "../../assets/clusterA/AFirstFloor/image_380082c0.png";
import img7 from "../../assets/clusterA/AFirstFloor/image_51681b53.png";

const AFirstFloor: React.FC = () => {
  return (
    <svg className="fullScreenSvg" preserveAspectRatio='none'
      xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
      <image  x="2111" width="606" height="1800" xlinkHref={img1} />
      <image  x="2247" y="1313" width="39" height="32" xlinkHref={img2} />
      <image  x="2409" y="1312" width="41" height="34" xlinkHref={img3} />
      <image  x="2291" y="978" width="34" height="29" xlinkHref={img4} />
      <image  x="2288" y="885" width="44" height="36" xlinkHref={img5} />
      <image  x="2393" y="465" width="36" height="25" xlinkHref={img6} />
      <image  x="2392" y="642" width="33" height="36" xlinkHref={img7} />
    </svg>
  );
};

export default AFirstFloor;

import React from "react";
import layer0 from "../../assets/clusterA/ARoof/layer_0.png";
import img1 from "../../assets/clusterA/ARoof/image_0a45da63.png";
import img2 from "../../assets/clusterA/ARoof/image_188eadf5.png";
import img3 from "../../assets/clusterA/ARoof/image_92562199.png";
import img4 from "../../assets/clusterA/ARoof/image_8353d605.png";
import img5 from "../../assets/clusterA/ARoof/image_9155af9f.png";

const ARoof: React.FC = () => {
  return (
    <svg className="fullScreen" preserveAspectRatio='none'
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2880"
      height="1800"
      viewBox="0 0 2880 1800"
    >
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
      <image x="2414" y="813" width="39" height="30" xlinkHref={img1} />
      <image x="2269" y="890" width="38" height="31" xlinkHref={img2} />
      <image x="2255" y="985" width="34" height="31" xlinkHref={img3} />
      <image x="2420" y="1330" width="38" height="32" xlinkHref={img4} />
      <image x="2105" width="606" height="1800" xlinkHref={img5} />
    </svg>
  );
};

export default ARoof;

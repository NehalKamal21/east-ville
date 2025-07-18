import React from "react";
import img1 from "../../assets/clusterB/BRoof/image_64d42c13.png";
import img2 from "../../assets/clusterB/BRoof/image_c8916c4c.png";
import img3 from "../../assets/clusterB/BRoof/image_c0117fc5.png";
import img4 from "../../assets/clusterB/BRoof/image_b80c7665.png";
import img5 from "../../assets/clusterB/BRoof/image_79694ef3.png";
import img6 from "../../assets/clusterB/BRoof/image_c90cd822.png";

const BRoof: React.FC = () => {
  return (
    <svg className="fullScreenSvg" preserveAspectRatio='none'
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2880"
      height="1800"
      viewBox="0 0 2880 1800"
    >
      <image
        id="Layer_0"
        data-name="Layer 0"
        width="2880"
        height="1800"
        xlinkHref={img1}
      />
      <image  x="2416" y="1327" width="46" height="31" xlinkHref={img2} />
      <image  x="2320" y="1138" width="34" height="31" xlinkHref={img3} />
      <image  x="2301" y="995" width="33" height="28" xlinkHref={img4} />
      <image  x="2403" y="800" width="58" height="50" xlinkHref={img5} />
      <image  x="2110" width="601" height="1800" xlinkHref={img6} />
    </svg>
  );
};

export default BRoof;

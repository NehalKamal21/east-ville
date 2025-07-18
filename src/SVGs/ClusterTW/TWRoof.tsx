import React from 'react';
import layer0 from '../../assets/clusterTW/TWRoof/image_00185bf7.png';
import img1 from '../../assets/clusterTW/TWRoof/image_0c30c9fb.png';
import img2 from '../../assets/clusterTW/TWRoof/image_1cd56ba9.png';
import img3 from '../../assets/clusterTW/TWRoof/image_322078a0.png';
import img4 from '../../assets/clusterTW/TWRoof/image_8fcf8ff3.png';

const TWRoof: React.FC = () => {
    return (
        <svg className="fullScreenSvg" preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
            <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0}/>
            <image  x="2091" width="618" height="1800" xlinkHref={img1}/>
            <image  x="2352" y="1106" width="31" height="25" xlinkHref={img2}/>
            <image  x="2341" y="1033" width="33" height="26" xlinkHref={img3}/>
            <image  x="2414" y="903" width="45" height="38" xlinkHref={img4}/>
        </svg>
    );
};

export default TWRoof;
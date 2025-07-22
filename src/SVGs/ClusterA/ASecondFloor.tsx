import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from "../../assets/clusterA/ASecondFloor/image_3503f3c6.png";
import img1 from "../../assets/clusterA/ASecondFloor/image_87f4cbc5.png";
import img2 from "../../assets/clusterA/ASecondFloor/image_8981182b.png";
import img3 from "../../assets/clusterA/ASecondFloor/image_6a4a7b03.png";
import img4 from "../../assets/clusterA/ASecondFloor/image_dc92bf35.png";
import img5 from "../../assets/clusterA/ASecondFloor/image_f8ecdd06.png";
import img6 from "../../assets/clusterA/ASecondFloor/image_ee667c0b.png";
import img7 from "../../assets/clusterA/ASecondFloor/image_c0e80be6.png";
import img8 from "../../assets/clusterA/ASecondFloor/image_34d4d63b.png";
import img9 from "../../assets/clusterA/ASecondFloor/image_55d5f099.png";

const ASecondFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('A') ? 'A' : 'A',
      floorId: FloorId || 'secondFloor',
      location: location
    };
    localStorage.setItem('panoramaConfig', JSON.stringify(panoramaConfig));
    navigate(`/clusterView/${clusterId}/${FloorId}/image`);
  };

  return (
    <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
    <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0}/>
    <image 
      x="1269" 
      y="1395" 
      width="460" 
      height="122" 
      xlinkHref={img1}
      style={{ cursor: 'pointer' }}
    />
    <image 
      x="1417" 
      y="352" 
      width="163" 
      height="79" 
      xlinkHref={img2}
      style={{ cursor: 'pointer' }}
    />
    <image 
      x="1247" 
      y="532" 
      width="504" 
      height="179" 
      xlinkHref={img3}
      style={{ cursor: 'pointer' }}
    />
    <image 
      x="2104" 
      width="624" 
      height="1809" 
      xlinkHref={img4}
      style={{ cursor: 'pointer' }}
    />
    <image 
      x="2183" 
      y="837" 
      width="358" 
      height="408" 
      xlinkHref={img5}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location3')}
    />
    <image 
      x="2185" 
      y="1148" 
      width="131" 
      height="303" 
      xlinkHref={img6}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location5')}
    />
    <image 
      x="2326" 
      y="1256" 
      width="322" 
      height="311" 
      xlinkHref={img7}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location4')}
    />
    <image 
      x="2184" 
      y="773" 
      width="216" 
      height="135" 
      xlinkHref={img8}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location2')}
    />
    <image 
      x="2183" 
      y="539" 
      width="465" 
      height="288" 
      xlinkHref={img9}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location1')}
    />
  </svg>
  );
};

export default ASecondFloor;

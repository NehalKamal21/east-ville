import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from "../../assets/clusterA/AFirstFloor/image_e2912d53.png";
import img1 from "../../assets/clusterA/AFirstFloor/image_a7e18dca.png";
import img2 from "../../assets/clusterA/AFirstFloor/image_59e36c1d.png";
import img3 from "../../assets/clusterA/AFirstFloor/image_48e72a08.png";
import img4 from "../../assets/clusterA/AFirstFloor/image_259f4b31.png";
import img5 from "../../assets/clusterA/AFirstFloor/image_4d8f2fa1.png";
import img6 from "../../assets/clusterA/AFirstFloor/image_3ddb5d61.png";
import img7 from "../../assets/clusterA/AFirstFloor/image_5a02debb.png";
import img8 from "../../assets/clusterA/AFirstFloor/image_da86f081.png";
import img9 from "../../assets/clusterA/AFirstFloor/image_9722bc5c.png";

const AFirstFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('A') ? 'A' : 'A',
      floorId: FloorId || 'firstFloor',
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
      x="2110" 
      width="618" 
      height="1802" 
      xlinkHref={img3}
      style={{ cursor: 'pointer' }}
    />
    <image 
      x="2184" 
      y="1143" 
      width="132" 
      height="304" 
      xlinkHref={img4}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location6')}
    />
    <image 
      x="2326" 
      y="1250" 
      width="323" 
      height="311" 
      xlinkHref={img5}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location5')}
    />
    <image 
      x="2184" 
      y="989" 
      width="214" 
      height="145" 
      xlinkHref={img6}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location4')}
    />
    <image 
      x="2183" 
      y="833" 
      width="216" 
      height="145" 
      xlinkHref={img7}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location3')}
    />
    <image 
      x="2184" 
      y="536" 
      width="463" 
      height="287" 
      xlinkHref={img8}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location2')}
    />
    <image 
      x="1240" 
      y="532" 
      width="518" 
      height="178" 
      xlinkHref={img9}
      style={{ cursor: 'pointer' }}
    />
  </svg>
  );
};

export default AFirstFloor;

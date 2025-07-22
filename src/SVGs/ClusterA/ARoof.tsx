import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from "../../assets/clusterA/ARoof/image_d4190ae6.png";
import img1 from "../../assets/clusterA/ARoof/image_4fa2920c.png";
import img2 from "../../assets/clusterA/ARoof/image_3d17e53f.png";
import img3 from "../../assets/clusterA/ARoof/image_2f85a7ce.png";
import img4 from "../../assets/clusterA/ARoof/image_047d556f.png";
import img5 from "../../assets/clusterA/ARoof/image_b879f188.png";
import img6 from "../../assets/clusterA/ARoof/image_0d691623.png";

const ARoof: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('A') ? 'A' : 'A',
      floorId: FloorId || 'Roof',
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
      x="2104" 
      y="-22" 
      width="624" 
      height="1825" 
      xlinkHref={img3}
      style={{ cursor: 'pointer' }}
    />
    <image 
      x="2177" 
      y="966" 
      width="184" 
      height="161" 
      xlinkHref={img4}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location1')}
    />
    <image 
      x="2177" 
      y="865" 
      width="184" 
      height="91" 
      xlinkHref={img5}
      style={{ cursor: 'pointer' }} className="villa-A"
      onClick={() => handlePanoramaClick('location2')}
    />
    <image 
      x="1251" 
      y="531" 
      width="516" 
      height="181" 
      xlinkHref={img6}
      style={{ cursor: 'pointer' }}
    />
  </svg>
  );
};

export default ARoof;

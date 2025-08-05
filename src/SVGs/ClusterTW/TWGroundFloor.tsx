import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePanoramaClick } from '../../utils/panoramaNavigation';
import layer0 from '../../assets/clusterTW/TWGroundFloor/image_74580c46.png';
import img1 from '../../assets/clusterTW/TWGroundFloor/image_aa1c4ab2.png';
import img2 from '../../assets/clusterTW/TWGroundFloor/image_e6c97812.png';
import img3 from '../../assets/clusterTW/TWGroundFloor/image_7a74f38b.png';
import img4 from '../../assets/clusterTW/TWGroundFloor/image_9e79e245.png';
import img5 from '../../assets/clusterTW/TWGroundFloor/image_7139545a.png';
import img6 from '../../assets/clusterTW/TWGroundFloor/image_87a7fd97.png';
import img7 from '../../assets/clusterTW/TWGroundFloor/image_8e859664.png';
import img8 from '../../assets/clusterTW/TWGroundFloor/image_e9d617b4.png';

const TWGroundFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = usePanoramaClick(navigate, clusterId, FloorId);

  return (
    <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
      <image x="1269" y="1395" width="460" height="122" xlinkHref={img1} />
      <image x="1417" y="352" width="163" height="79" xlinkHref={img2} />
      <image x="1227" y="491" width="543" height="238" xlinkHref={img3} />
      <image x="2133" width="633" height="1804" xlinkHref={img4} />
      <image x="2352" y="1412" width="102" height="140" className='villa-T' xlinkHref={img5} onClick={() => handlePanoramaClick('location3')} />
      <image x="2216" y="1239" width="127" height="224" className='villa-T' xlinkHref={img6} />  
      <image x="2461" y="1231" width="221" height="317" className='villa-T' xlinkHref={img7} onClick={() => handlePanoramaClick('location2')} />
      <image x="2217" y="734" width="465" height="495" className='villa-T' xlinkHref={img8} onClick={() => handlePanoramaClick('location1')} />
    </svg>
  );
};

export default TWGroundFloor;
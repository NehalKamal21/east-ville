import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from '../../assets/clusterB/BSecondFloor/image_1d877df4.png';
import img1 from '../../assets/clusterB/BSecondFloor/image_52ee72ec.png';
import img2 from '../../assets/clusterB/BSecondFloor/image_818eb2ed.png';
import img3 from '../../assets/clusterB/BSecondFloor/image_fe526671.png';
import img4 from '../../assets/clusterB/BSecondFloor/image_4557a8cd.png';
import img5 from '../../assets/clusterB/BSecondFloor/image_565f19a9.png';
import img6 from '../../assets/clusterB/BSecondFloor/image_ee5ce6dd.png';
import img7 from '../../assets/clusterB/BSecondFloor/image_8239a325.png';
import img8 from '../../assets/clusterB/BSecondFloor/image_b6d5ea0f.png';
import img9 from '../../assets/clusterB/BSecondFloor/image_307e1cf4.png';
import img10 from '../../assets/clusterB/BSecondFloor/image_9c309f6e.png';

const BSecondFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('B') ? 'B' : 'B',
      floorId: FloorId || 'secondFloor',
      location: location
    };
    localStorage.setItem('panoramaConfig', JSON.stringify(panoramaConfig));
    navigate(`/clusterView/${clusterId}/${FloorId}/image`);
  };

  return (
    <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
      <image x="1269" y="1395" width="460" height="122" xlinkHref={img1} />
      <image x="1238" y="519" width="541" height="176" xlinkHref={img3} />
      <image x="2115" width="613" height="1803" xlinkHref={img4} />
      <image x="2222" y="1254" width="145" height="242" xlinkHref={img5} className='villa-B' onClick={() => handlePanoramaClick('location5')} />
      <image x="2326" y="1269" width="308" height="345" xlinkHref={img6} className='villa-B' onClick={() => handlePanoramaClick('location4')} />
      <image x="2223" y="1019" width="144" height="225" xlinkHref={img7} className='villa-B' onClick={() => handlePanoramaClick('location3')} />
      <image x="2224" y="833" width="143" height="175" xlinkHref={img8} className='villa-B' onClick={() => handlePanoramaClick('location2')} />
      <image x="2377" y="834" width="258" height="440" xlinkHref={img9} className='villa-B' onClick={() => handlePanoramaClick('location6')} />
      <image x="2222" y="513" width="414" height="310" xlinkHref={img10} className='villa-B' onClick={() => handlePanoramaClick('location1')} />
    </svg>
  );
};

export default BSecondFloor;

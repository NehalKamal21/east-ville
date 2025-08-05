import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from '../../assets/clusterTW/TWSecondFloor/image_04894a4e.png';
import img1 from '../../assets/clusterTW/TWSecondFloor/image_32b47103.png';
import img2 from '../../assets/clusterTW/TWSecondFloor/image_581ec2c5.png';
import img3 from '../../assets/clusterTW/TWSecondFloor/image_26f6bea6.png';
import img4 from '../../assets/clusterTW/TWSecondFloor/image_c752f80e.png';
import img5 from '../../assets/clusterTW/TWSecondFloor/image_0761791e.png';
import img6 from '../../assets/clusterTW/TWSecondFloor/image_eee595df.png';
import img7 from '../../assets/clusterTW/TWSecondFloor/image_7baf6a92.png';
import img8 from '../../assets/clusterTW/TWSecondFloor/image_9ec08d65.png';
import img9 from '../../assets/clusterTW/TWSecondFloor/image_176ed469.png';
import img10 from '../../assets/clusterTW/TWSecondFloor/image_a3c9e06c.png';

const TWSecondFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    console.log('Panorama click:', location); // Debug log
    const panoramaConfig = {
      clusterId: clusterId || 'T',
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
      <image x="1417" y="352" width="163" height="79" xlinkHref={img2} />
      <image x="2099" y="-17" width="626" height="1815" xlinkHref={img3} />
      <image x="2180" y="1313" width="126" height="144" xlinkHref={img4} className='villa-T' onClick={() => handlePanoramaClick('location6')} />
      <image x="2315" y="1316" width="330" height="228" xlinkHref={img5} className='villa-T' onClick={() => handlePanoramaClick('location5')} />
      <image x="2177" y="959" width="392" height="347" xlinkHref={img6} className='villa-T' onClick={() => handlePanoramaClick('location4')} />
      <image x="2547" y="721" width="98" height="230" xlinkHref={img7} className='villa-T' onClick={() => handlePanoramaClick('location2')} />
      <image x="2422" y="723" width="118" height="229" xlinkHref={img8} className='villa-T' onClick={() => handlePanoramaClick('location3')} />
      <image x="2178" y="725" width="236" height="301" xlinkHref={img9} className='villa-T' onClick={() => handlePanoramaClick('location1')} />
      <image x="1272" y="527" width="454" height="166" xlinkHref={img10} />
    </svg>
  );
};

export default TWSecondFloor;
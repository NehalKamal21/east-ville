import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from "../../assets/clusterB/BGroundFloor/image_648c74ba.png";
import img1 from "../../assets/clusterB/BGroundFloor/image_a6888e98.png";
import img2 from "../../assets/clusterB/BGroundFloor/image_120424fc.png";
import img3 from "../../assets/clusterB/BGroundFloor/image_7d37fe0c.png";
import img4 from "../../assets/clusterB/BGroundFloor/image_57bb13e9.png";
import img5 from "../../assets/clusterB/BGroundFloor/image_044cd22e.png";
import img6 from "../../assets/clusterB/BGroundFloor/image_83e841db.png";
import img7 from "../../assets/clusterB/BGroundFloor/image_dbc11781.png";

const BGroundFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('B') ? 'B' : 'B',
      floorId: FloorId || 'groundFloor',
      location: location
    };
    localStorage.setItem('panoramaConfig', JSON.stringify(panoramaConfig));
    navigate(`/clusterView/${clusterId}/${FloorId}/image`);
  };

  return (
    <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
    <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0}/>
    <image x="1269" y="1395" width="460" height="122" xlinkHref={img1}/>
    <image x="1417" y="352" width="163" height="79" xlinkHref={img2} />
    <image x="1254" y="519" width="513" height="193" xlinkHref={img3} />
    <image x="2107" width="621" height="1803" xlinkHref={img4} />
    <image x="2336" y="1363" width="290" height="245" xlinkHref={img5} className='villa-B' onClick={() => handlePanoramaClick('location2')}/>
    <image x="2505" y="1148" width="122" height="203" xlinkHref={img6} className='villa-B' onClick={() => handlePanoramaClick('location4')}/>
    <image x="2215" y="511" width="415" height="853" xlinkHref={img7} className='villa-B' onClick={() => handlePanoramaClick('location1')}/>
  </svg>
  );
};

export default BGroundFloor;

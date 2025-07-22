import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from "../../assets/clusterB/BFirstFloor/image_f94d7fa6.png";
import img1 from "../../assets/clusterB/BFirstFloor/image_aa9ed61c.png";
import img2 from "../../assets/clusterB/BFirstFloor/image_a21a114f.png";
import img3 from "../../assets/clusterB/BFirstFloor/image_0b7603a9.png";
import img4 from "../../assets/clusterB/BFirstFloor/image_b4523e2d.png";
import img5 from "../../assets/clusterB/BFirstFloor/image_df9dad61.png";
import img6 from "../../assets/clusterB/BFirstFloor/image_c366944a.png";
import img7 from "../../assets/clusterB/BFirstFloor/image_e113dea1.png";
import img8 from "../../assets/clusterB/BFirstFloor/image_bc63f1e3.png";
import img9 from "../../assets/clusterB/BFirstFloor/image_f32521ca.png";
import img10 from "../../assets/clusterB/BFirstFloor/image_99dec6d0.png";

const BFirstFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('B') ? 'B' : 'B',
      floorId: FloorId || 'firstFloor',
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
      <image x="1234" y="519" width="542" height="205" xlinkHref={img3} />
      <image x="2116" width="612" height="1800" xlinkHref={img4} />
      <image x="2382" y="830" width="254" height="438" xlinkHref={img5} />
      <image x="2330" y="1275" width="308" height="330" xlinkHref={img6} className='villa-B' onClick={() => handlePanoramaClick('location5')} />
      <image x="2227" y="1249" width="121" height="242" xlinkHref={img7} className='villa-B' onClick={() => handlePanoramaClick('location6')} />
      <image x="2228" y="1015" width="144" height="227" xlinkHref={img8} className='villa-B' onClick={() => handlePanoramaClick('location4')} />
      <image x="2227" y="832" width="143" height="174" xlinkHref={img9} className='villa-B' onClick={() => handlePanoramaClick('location3')} />
      <image x="2227" y="511" width="411" height="309" xlinkHref={img10} className='villa-B' onClick={() => handlePanoramaClick('location2')} />
    </svg>
  );
};

export default BFirstFloor;

import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import layer0 from "../../assets/clusterB/BRoof/image_1856d82d.png";
import img1 from "../../assets/clusterB/BRoof/image_2146b77b.png";
import img2 from "../../assets/clusterB/BRoof/image_3849ae30.png";
import img3 from "../../assets/clusterB/BRoof/image_3508e608.png";
import img4 from "../../assets/clusterB/BRoof/image_0345e78f.png";
import img5 from "../../assets/clusterB/BRoof/image_af73e295.png";
import img6 from "../../assets/clusterB/BRoof/image_ba1e1dad.png";

const BRoof: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

  const handlePanoramaClick = (location: string) => {
    const panoramaConfig = {
      clusterId: clusterId?.startsWith('B') ? 'B' : 'B',
      floorId: FloorId || 'Roof',
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
      <image x="1238" y="519" width="538" height="180" xlinkHref={img3} />
      <image x="2109" width="619" height="1804" xlinkHref={img4} />
      <image x="2223" y="1073" width="156" height="194" className='villa-B' xlinkHref={img5} onClick={() => handlePanoramaClick('location1')} />
      <image x="2221" y="965" width="160" height="98" className='villa-B' xlinkHref={img6} onClick={() => handlePanoramaClick('location2')} />
    </svg>
  );
};

export default BRoof;

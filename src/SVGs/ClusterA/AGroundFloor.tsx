import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { usePanoramaClick } from '../../utils/panoramaNavigation';
import layer0 from "../../assets/clusterA/AGroundFloor/image_ab601311.png";
import img1 from "../../assets/clusterA/AGroundFloor/image_7fc8ae7b.png";
import img2 from "../../assets/clusterA/AGroundFloor/image_27b1e69b.png";
import img3 from "../../assets/clusterA/AGroundFloor/image_e3dba228.png";
import img4 from "../../assets/clusterA/AGroundFloor/image_cea36707.png";
import img5 from "../../assets/clusterA/AGroundFloor/image_34ef8e10.png";
import img6 from "../../assets/clusterA/AGroundFloor/image_80ea181a.png";
import img7 from "../../assets/clusterA/AGroundFloor/image_4378a9b0.png";
import img8 from "../../assets/clusterA/AGroundFloor/image_f48a940d.png";

const AGroundFloor: React.FC = () => {
  const navigate = useNavigate();
  const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();
  const handlePanoramaClick = usePanoramaClick(navigate, clusterId, FloorId);

  return (
    <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
      <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
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
        x="1273" 
        y="532" 
        width="481" 
        height="158" 
        xlinkHref={img3}
        style={{ cursor: 'pointer' }}
      />
      <image 
        x="2113" 
        width="615" 
        height="1795" 
        xlinkHref={img4}
        style={{ cursor: 'pointer' }}
      />
      <image 
        x="2412" 
        y="1129" 
        width="236" 
        height="428" 
        xlinkHref={img5}
        style={{ cursor: 'pointer' }} className="villa-A"
        onClick={() => handlePanoramaClick('location2')}
      />
      <image 
        x="2329" 
        y="1351" 
        width="130" 
        height="205" 
        xlinkHref={img6}
        style={{ cursor: 'pointer' }} className="villa-A"
        onClick={() => handlePanoramaClick('location4')}
      />
      <image 
        x="2185" 
        y="1130" 
        width="132" 
        height="311" 
        xlinkHref={img7}
        style={{ cursor: 'pointer' }} className="villa-A"
        onClick={() => handlePanoramaClick('location3')}
      />
      <image 
        x="2185" 
        y="534" 
        width="463" 
        height="596" 
        xlinkHref={img8}
        style={{ cursor: 'pointer' }} className="villa-A"
        onClick={() => handlePanoramaClick('location1')}
      />
    </svg>
  );
};

export default AGroundFloor;

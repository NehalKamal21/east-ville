import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePanoramaClick } from '../../utils/panoramaNavigation';
import layer0 from '../../assets/clusterTW/TWFirstFloor/image_57667915.png';
import img1 from '../../assets/clusterTW/TWFirstFloor/image_f78276dc.png';
import img2 from '../../assets/clusterTW/TWFirstFloor/image_365c8ed9.png';
import img3 from '../../assets/clusterTW/TWFirstFloor/image_a8897edc.png';
import img4 from '../../assets/clusterTW/TWFirstFloor/image_8c2dd0e9.png';
import img5 from '../../assets/clusterTW/TWFirstFloor/image_a8cc4688.png';
import img6 from '../../assets/clusterTW/TWFirstFloor/image_fcd3b6c7.png';
import img7 from '../../assets/clusterTW/TWFirstFloor/image_de432920.png';
import img8 from '../../assets/clusterTW/TWFirstFloor/image_2f099d2d.png';
import img9 from '../../assets/clusterTW/TWFirstFloor/image_fedce9e2.png';
import img10 from '../../assets/clusterTW/TWFirstFloor/image_d0ef7e92.png';

const TWFirstFloor: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

    const handlePanoramaClick = usePanoramaClick(navigate, clusterId, FloorId);

    return (
        <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
            <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
            <image x="1269" y="1395" width="460" height="122" xlinkHref={img1} />
            <image x="1417" y="352" width="163" height="79" xlinkHref={img2} />
            <image x="2111" width="615" height="1799" xlinkHref={img3} />
            <image x="2190" y="1324" width="127" height="139" xlinkHref={img4} className='villa-T' onClick={() => handlePanoramaClick('location6')} />
            <image x="2328" y="1325" width="323" height="224" xlinkHref={img5} className='villa-T' onClick={() => handlePanoramaClick('location5')} />
            <image x="2190" y="1187" width="127" height="130" xlinkHref={img6} className='villa-T' onClick={() => handlePanoramaClick('location4')} />
            <image x="2188" y="973" width="237" height="259" xlinkHref={img7} className='villa-T' onClick={() => handlePanoramaClick('location3')} />
            <image x="2541" y="738" width="111" height="227" xlinkHref={img8} className='villa-T' onClick={() => handlePanoramaClick('location2')} />
            <image x="2190" y="740" width="342" height="224" xlinkHref={img9} className='villa-T' onClick={() => handlePanoramaClick('location1')} />
            <image x="1269" y="527" width="463" height="176" xlinkHref={img10} />
        </svg>
    );
};

export default TWFirstFloor;
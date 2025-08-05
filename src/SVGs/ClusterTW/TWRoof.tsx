import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePanoramaClick } from '../../utils/panoramaNavigation';
import layer0 from '../../assets/clusterTW/TWRoof/image_73b0b3f9.png';
import img1 from '../../assets/clusterTW/TWRoof/image_14322978.png';
import img2 from '../../assets/clusterTW/TWRoof/image_4e1a20b5.png';
import img3 from '../../assets/clusterTW/TWRoof/image_6c72928d.png';
import img4 from '../../assets/clusterTW/TWRoof/image_d92e6444.png';
import img5 from '../../assets/clusterTW/TWRoof/image_88803b16.png';
import img6 from '../../assets/clusterTW/TWRoof/image_9cd14218.png';

const TWRoof: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId, FloorId } = useParams<{ clusterId: string; FloorId: string }>();

    const handlePanoramaClick = usePanoramaClick(navigate, clusterId, FloorId);

    return (
        <svg className="fullScreenSvg" preserveAspectRatio='' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2880" height="1800" viewBox="0 0 2880 1800">
            <image id="Layer_0" data-name="Layer 0" width="2880" height="1800" xlinkHref={layer0} />
            <image x="1269" y="1395" width="460" height="122" xlinkHref={img1} />
            <image x="1417" y="352" width="163" height="79" xlinkHref={img2} />
            <image x="1273" y="532" width="447" height="170" xlinkHref={img3} />
            <image x="2119" width="609" height="1798" xlinkHref={img4} />
            <image x="2290" y="1086" width="136" height="146" xlinkHref={img5} className='villa-T' onClick={() => handlePanoramaClick('location1')} />
            <image x="2289" y="998" width="138" height="80" xlinkHref={img6} className='villa-T' onClick={() => handlePanoramaClick('location2')} />
        </svg>
    );
};

export default TWRoof;
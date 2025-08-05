import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgBg from '../../assets/clusterTW/TWBack/image_725eafa2.png';
import img1 from '../../assets/clusterTW/TWBack/image_374f7bd8.png';
import img2 from '../../assets/clusterTW/TWBack/image_82579478.png';
import img3 from '../../assets/clusterTW/TWBack/image_ed035740.png';

const TWBack: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };

    return (
        <svg preserveAspectRatio='none' className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2401" viewBox="0 0 2000 2401">
            <image width="2000" height="2401" xlinkHref={imgBg} />
            <image id="groundFloor" className='villa-T' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="428" y="1892" width="1071" height="254" xlinkHref={img1} />
            <image id="firstFloor" className='villa-T' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="417" y="1536" width="1081" height="211" xlinkHref={img2} />
            <image id="secondFloor" className='villa-T' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="419" y="1200" width="1078" height="323" xlinkHref={img3} />
        </svg>
    );
};

export default TWBack;
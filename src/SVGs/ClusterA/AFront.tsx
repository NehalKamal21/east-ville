import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgBg from '../../assets/clusterA/AFront/image_220e00a1.png';
import img1 from '../../assets/clusterA/AFront/image_40216c39.png';
import img2 from '../../assets/clusterA/AFront/image_346b58b4.png';
import img3 from '../../assets/clusterA/AFront/image_12629b59.png';

const AFront: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };

    return (
        <svg preserveAspectRatio='none' className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2334" viewBox="0 0 2000 2334">
            <image width="2000" height="2334" xlinkHref={imgBg} />
            <image id="secondFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="566" y="1060" width="1213" height="407" xlinkHref={img1} />
            <image id="groundFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="494" y="1662" width="1123" height="222" xlinkHref={img2} />
            <image id="firstFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="565" y="1354" width="1213" height="255" xlinkHref={img3} />
        </svg>
    );
};

export default AFront;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgBg from '../../assets/clusterB/BFront/image_89a645e7.png';
import img1 from '../../assets/clusterB/BFront/image_b2a0c035.png';
import img2 from '../../assets/clusterB/BFront/image_312a346f.png';
import img3 from '../../assets/clusterB/BFront/image_e45e0f80.png';

const BFront: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };

    return (
        <svg preserveAspectRatio='none' className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2334" viewBox="0 0 2000 2334">
            <image width="2000" height="2334" xlinkHref={imgBg}/>
            <image id="secondFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="550" y="1053" width="1236" height="413" xlinkHref={img1}/>
            <image id="firstFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="554" y="1349" width="1233" height="272" xlinkHref={img2}/>
            <image id="groundFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="482" y="1666" width="1322" height="221" xlinkHref={img3}/>
        </svg>
    );
};

export default BFront;
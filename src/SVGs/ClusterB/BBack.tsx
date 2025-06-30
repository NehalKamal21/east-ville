import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import imgBg from "../../assets/clusterB/BBack/image_b1bce5e5.png";
import img1 from "../../assets/clusterB/BBack/image_43e32785.png";
import img2 from "../../assets/clusterB/BBack/image_e3dd84a1.png";
import img3 from "../../assets/clusterB/BBack/image_fefc27df.png";

const BBack: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };


    return (
        <svg preserveAspectRatio='none' className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2401" viewBox="0 0 2000 2401">
            <image width="2000" height="2401" xlinkHref={imgBg}/>
            <image id="groundFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="223" y="1955" width="1630" height="215" xlinkHref={img1}/>
            <image id="firstFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="213" y="1647" width="1644" height="225" xlinkHref={img2}/>
            <image id="secondFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="213" y="1359" width="1680" height="363" xlinkHref={img3}/>
        </svg>
    );
};

export default BBack;
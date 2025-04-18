import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import img01 from "../../assets/clusterB/BBack/image_01.png";
import img02 from "../../assets/clusterB/BBack/image_02.png";
import img03 from "../../assets/clusterB/BBack/image_03.png";
import img04 from "../../assets/clusterB/BBack/image_04.png";

const BBack: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };


    return (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none' className='fullScreenSvg' xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2401" viewBox="0 0 2000 2401">
            <image id="Layer_0" data-name="Layer 0" width="2000" height="2401" xlinkHref={img01}/>
            <image id="groundFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="107" y="1899" width="1829" height="269" xlinkHref={img02} />
            <image id="firstFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="6" y="1578" width="1934" height="382" xlinkHref={img03} />
            <image id="secondFloor" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="5" y="1175" width="1935" height="565" xlinkHref={img04} />
        </svg>
    );
};

export default BBack;
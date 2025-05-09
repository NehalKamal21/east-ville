import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import img01 from "../../assets/clusterA/AFront/image_01.png";
import img02 from "../../assets/clusterA/AFront/image_02.png";
import img03 from "../../assets/clusterA/AFront/image_03.png";
import img04 from "../../assets/clusterA/AFront/image_04.png";

const AFront: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };



    return (
        <svg className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2334" viewBox="0 0 2000 2334" preserveAspectRatio='none'>
            <image id="Layer_0" data-name="Layer 0" width="2000" height="2334" xlinkHref={img01} />
            <image id="groundFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="206" y="1616" width="1628" height="270" xlinkHref={img02} />
            <image id="firstFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="191" y="1318" width="1640" height="363" xlinkHref={img03} />
            <image id="secondFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="174" y="870" width="1658" height="633" xlinkHref={img04} />
        </svg>

    );
};

export default AFront;
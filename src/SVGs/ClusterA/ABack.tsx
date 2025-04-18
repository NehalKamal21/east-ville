import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import img01 from "../../assets/clusterA/ABack/image_01.png";
import img02 from "../../assets/clusterA/ABack/image_02.png";
import img03 from "../../assets/clusterA/ABack/image_03.png";
import img04 from "../../assets/clusterA/ABack/image_04.png";
const ABack: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };

    return (
        <svg className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2401" viewBox="0 0 2000 2401" preserveAspectRatio='none'>
            <image id="Background" width="2000" height="2401" xlinkHref={img01} />
            <image id="groundFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="16" y="1713" width="1864" height="278" xlinkHref={img02} />
            <image id="firstFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} y="1385" width="1967" height="393" xlinkHref={img03} />
            <image id="secondFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="62" y="982" width="1904" height="572" xlinkHref={img04} />
        </svg>

    );
};

export default ABack;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import img01 from "../../assets/clusterA/ABack/image_bbd1a37c.png";
import img02 from "../../assets/clusterA/ABack/image_14e28322.png";
import img03 from "../../assets/clusterA/ABack/image_1097c0e4.png";
import img04 from "../../assets/clusterA/ABack/image_0508ad75.png";

const ABack: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };

    return (
        <svg preserveAspectRatio='none' className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2401" viewBox="0 0 2000 2401">
            <image width="2000" height="2401" xlinkHref={img01}/>
            <image id="secondFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="208" y="1172" width="1672" height="355" xlinkHref={img02}/>
            <image id="firstFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="204" y="1463" width="1671" height="236" xlinkHref={img03}/>
            <image id="groundFloor" className='villa-A' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="263" y="1775" width="1486" height="224" xlinkHref={img04}/>
        </svg>
    );
};

export default ABack;
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import imgBg from '../../assets/clusterTW/TWFront/image_493fe6dd.png';
import img1 from '../../assets/clusterTW/TWFront/image_953324b5.png';
import img2 from '../../assets/clusterTW/TWFront/image_e7e7fea3.png';
import img3 from '../../assets/clusterTW/TWFront/image_5dea9749.png';

const TWFront: React.FC = () => {
    const navigate = useNavigate();
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const FloorId = event.currentTarget.id; // Get the ID of clicked Floor
        navigate('/clusterView/' + clusterId + '/' + FloorId);
    };



    return (
        <svg preserveAspectRatio='none' className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2000" height="2334" viewBox="0 0 2000 2334">
            <image width="2000" height="2334" xlinkHref={imgBg} />
            <image id="secondFloor" className='villa-TW' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="961" y="982" width="528" height="311" xlinkHref={img1} />
            <image id="firstFloor" className='villa-TW' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="962" y="1297" width="530" height="210" xlinkHref={img2} />
            <image id="groundFloor" className='villa-TW' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="921" y="1633" width="576" height="259" xlinkHref={img3} />
        </svg>

    );
};

export default TWFront;
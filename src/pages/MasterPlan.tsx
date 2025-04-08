import React, { useEffect, useRef, useState } from 'react';
import MasterPlanSvg from '../SVGs/MasterPlanSvg';
import axios from "axios";
import CompoundImageCarousel from '../components/CompoundImageCarousel';
import { Button } from 'react-bootstrap';
import img1 from '../assets/01.png';
import img2 from '../assets/02.png';
import img3 from '../assets/03.png';
import img4 from '../assets/04.png';
import img5 from '../assets/05.png';
import img6 from '../assets/06.png';
import img7 from '../assets/07.png';
import img8 from '../assets/08.png';
import img9 from '../assets/09.png';
import img10 from '../assets/10.png';
import img11 from '../assets/11.png';
import MasterPlanFilter from '../components/MasterPlanFilter';
import VillaSearchFromClusters from '../components/VillaSearchFromClusters';


const MasterPlan: React.FC = () => {
    const [clusters, setClusters] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const effectRun = useRef(false);
    const compoundImages = [
        img1, img10, img11, img2, img3, img4, img5, img6, img7, img8, img9
    ];

    const handleTypeChange = (type: string) => {
        console.log("Type:", type);
    };

    const handleAreaChange = (index: number) => {
        console.log("Area filter:", index); // 0, 1, or 2
    };

    useEffect(() => {
        async function fetchCluster() {
            try {
                const response = await axios.get(`http://localhost:5000/clusters`);
                const data = response.data;

                data.map((item: any) => {
                    item.availableUnits = item.villas.filter((villa: any) => villa.status === "Available").length;
                    // return item;
                });
                setClusters(data);
            } catch (err) {
                setError("Cluster not found");
            }
        }
        if (!effectRun.current) {
            effectRun.current = true;
            fetchCluster();
        }
    }, []);
    const [showCarousel, setShowCarousel] = useState(false);

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            <VillaSearchFromClusters />
            <MasterPlanSvg points={clusters} />

            <Button
                variant="dark"
                className="position-absolute top-0 end-0 m-3 shadow"
                onClick={() => setShowCarousel(true)}
                style={{ zIndex: '1000' }}
            >
                View Compound Gallery
            </Button>
            <CompoundImageCarousel
                show={showCarousel}
                onClose={() => setShowCarousel(false)}
                images={compoundImages}
            />

            <MasterPlanFilter
                onTypeChange={handleTypeChange}
                onAreaChange={handleAreaChange}
            />

        </div>
    );
};

export default MasterPlan;
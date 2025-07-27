// TODO: Define proper props interface
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
import backgroundImage from '../assets/masterplan/image_1.png';
import MasterPlanFilter from '../components/MasterPlanFilter';
import VillaSearchFromClusters from '../components/VillaSearchFromClusters';
import KasakounGalleryCarousel from '../components/KasakounGalleryCarousel';
import LoadingScreen from '../components/LoadingScreen';


const MasterPlan: React.FC = () => {
    const [clusters, setClusters] = useState([]);
    // @ts-ignore
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);

    const [selectedArea, setSelectedArea] = useState<number>(-1);
    const [selectedType, setSelectedType] = useState<string>("");

    const effectRun = useRef(false);
    const compoundImages = [
        img1, img10, img11, img2, img3, img4, img5, img6, img7, img8, img9
    ];

    // Images for Kasakoun Gallery tabs from public/KASAKOUN
    const kasakounTabImages = [
        [
            '/KASAKOUN/1%20BEDROOM/1.jpg',
            '/KASAKOUN/1%20BEDROOM/2.jpg',
            '/KASAKOUN/1%20BEDROOM/3.jpg',
            '/KASAKOUN/1%20BEDROOM/4.jpg',
            '/KASAKOUN/1%20BEDROOM/5.jpg',
            '/KASAKOUN/1%20BEDROOM/6.jpg',
        ],
        [
            '/KASAKOUN/2%20BEDROOM/1.jpg',
            '/KASAKOUN/2%20BEDROOM/2.jpg',
            '/KASAKOUN/2%20BEDROOM/3.jpg',
            '/KASAKOUN/2%20BEDROOM/4.jpg',
            '/KASAKOUN/2%20BEDROOM/5.jpg',
            '/KASAKOUN/2%20BEDROOM/6.jpg',
            '/KASAKOUN/2%20BEDROOM/7.jpg',
            '/KASAKOUN/2%20BEDROOM/8.jpg',
        ],
        [
            '/KASAKOUN/Corridor/1.jpg',
            '/KASAKOUN/Corridor/2.jpg',
            '/KASAKOUN/Corridor/3.jpg',
        ],
        [
            '/KASAKOUN/ENTRANCE/1.jpg',
            '/KASAKOUN/ENTRANCE/2.jpg',
            '/KASAKOUN/ENTRANCE/3.jpg',
            '/KASAKOUN/ENTRANCE/4.jpg',
            '/KASAKOUN/ENTRANCE/5.jpg',
        ],
        [
            '/KASAKOUN/KASAKOUN/KASAKOUN_.jpg',
            '/KASAKOUN/KASAKOUN/KASAKOUN_02.jpg',
            '/KASAKOUN/KASAKOUN/KASAKOUN_03.jpg',
            '/KASAKOUN/KASAKOUN/KASAKOUN_04.jpg',
            '/KASAKOUN/KASAKOUN/KASAKOUN_05.jpg',
            '/KASAKOUN/KASAKOUN/KASAKOUN_06.jpg',
            '/KASAKOUN/KASAKOUN/KASAKOUN-01.jpg',
        ],
        [
            '/KASAKOUN/STUDIO/1.jpg',
            '/KASAKOUN/STUDIO/2.jpg',
            '/KASAKOUN/STUDIO/3.jpg',
            '/KASAKOUN/STUDIO/4.jpg',
            '/KASAKOUN/STUDIO/5.jpg',
            '/KASAKOUN/STUDIO/6.jpg',
        ],
    ];
    const kasakounTabTitles = ["1 BEDROOM", "2 BEDROOM", "Corridor", "ENTRANCE", "Kasakoun", "Studio"];

    const handleTypeChange = (type: string) => {
        console.log("Type:", type);
        setSelectedType(type);
    };

    const handleAreaChange = (index: number) => {
        console.log("Area filter:", index); // 0, 1, or 2
        setSelectedArea(index);
    };

    // Preload background image
    useEffect(() => {
        const preloadBackgroundImage = () => {
            const img = new Image();
            img.onload = () => {
                setBackgroundImageLoaded(true);
            };
            img.onerror = () => {
                console.error('Failed to load background image');
                setBackgroundImageLoaded(true); // Continue anyway
            };
            img.src = backgroundImage;
        };

        preloadBackgroundImage();
    }, []);

    useEffect(() => {
        const fetchCluster = async (): Promise<void> => {
            try {
                const response = await axios.get(`/api/clusters`);
                const data = response.data;

                data.map((item: any) => {
                    item.availableUnits = item.villas.filter((villa: any) => villa.status === "Available").length;
                    item.totalVillas = item.villas.length;
                    // return item;
                });
                setClusters(data);
                setIsLoading(false);
            } catch (err) {
                setError("Cluster not found");
                setIsLoading(false);
            }
        }
        if (!effectRun.current) {
            effectRun.current = true;
            fetchCluster();
        }
    }, []);
    const [showCarousel, setShowCarousel] = useState(false);
    const [showKasakoun, setShowKasakoun] = useState(false);

    // Combined loading state - wait for both data and background image
    const isFullyLoaded = !isLoading && backgroundImageLoaded;

    // Show loading screen until everything is ready
    if (!isFullyLoaded) {
        return <LoadingScreen />;
    }

    return (
        <div className="master-plan-container" style={{ position: "relative", height: "100vh" }}>
            {/* Floating Gallery Buttons - top right */}
            <div className="floating-gallery-buttons">
                <Button
                    variant="dark"
                    className="shadow"
                    onClick={() => setShowCarousel(true)}
                >
                    View Compound Gallery
                </Button>
                <Button
                    variant="dark"
                    className="shadow"
                    onClick={() => setShowKasakoun(true)}
                >
                    View KASAKOUN Gallery
                </Button>
            </div>

            <VillaSearchFromClusters />
            <CompoundImageCarousel
                show={showCarousel}
                onClose={() => setShowCarousel(false)}
                images={compoundImages}
            />
            <KasakounGalleryCarousel
                show={showKasakoun}
                onClose={() => setShowKasakoun(false)}
                tabImages={kasakounTabImages}
                tabTitles={kasakounTabTitles}
            />
            <MasterPlanSvg points={clusters} selectedArea={selectedArea} selectedType={selectedType} />
            <MasterPlanFilter
                onTypeChange={handleTypeChange}
                onAreaChange={handleAreaChange}
            />
        </div>
    );
};

export default MasterPlan;
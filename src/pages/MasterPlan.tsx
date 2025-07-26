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
import MasterPlanFilter from '../components/MasterPlanFilter';
import VillaSearchFromClusters from '../components/VillaSearchFromClusters';
import KasakounGalleryCarousel from '../components/KasakounGalleryCarousel';
import { preloadImages } from '../utils/imageOptimization';
import { loadingManager } from '../utils/loadingManager';
import { 
  masterPlanImages, 
  preloadAllCriticalImages 
} from '../utils/comprehensiveImagePreloader';
import MasterPlanBackground from '../components/MasterPlanBackground';


const MasterPlan: React.FC = () => {
    const [clusters, setClusters] = useState([]);
    // @ts-ignore
    const [error, setError] = useState<string | null>(null);

    const [selectedArea, setSelectedArea] = useState<number>(-1);
    const [selectedType, setSelectedType] = useState<string>("");

    const effectRun = useRef(false);
    const compoundImages = [
        img1, img10, img11, img2, img3, img4, img5, img6, img7, img8, img9
    ];

    // Register and preload critical images on component mount
    useEffect(() => {
        const preloadCriticalImages = async () => {
            try {
                // Register master plan images with loading manager
                masterPlanImages.forEach((img, index) => {
                    loadingManager.registerItem(
                        `masterplan-${index}`,
                        img,
                        'image',
                        index === 0 ? 'critical' : index < 5 ? 'high' : 'normal' // Reduced from 10 to 5
                    );
                });

                // Register compound images with loading manager using imported variables
                // Only register first 3 as critical, rest as normal priority
                const importedCompoundImages = [img1, img10, img11, img2, img3, img4, img5, img6, img7, img8, img9];
                importedCompoundImages.forEach((img, index) => {
                    loadingManager.registerItem(
                        `compound-image-${index}`,
                        img,
                        'image',
                        index < 3 ? 'critical' : 'normal' // Changed from 'high' to 'normal' for non-critical
                    );
                });

                // Preload critical master plan images
                await preloadAllCriticalImages();
                
                // Preload only first 2 compound images (reduced from 3)
                console.log('🏠 Preloading critical compound images...');
                const criticalCompoundImages = [img1, img10]; // Reduced from 3 to 2
                const preloadPromises = criticalCompoundImages.map((img, index) => {
                    return new Promise<void>((resolve) => {
                        const image = new Image();
                        image.onload = () => {
                            loadingManager.markLoaded(`compound-image-${index}`);
                            resolve();
                        };
                        image.onerror = () => {
                            console.warn(`Failed to preload compound image ${index}`);
                            resolve();
                        };
                        image.src = img;
                    });
                });
                
                await Promise.allSettled(preloadPromises);
                
                console.log('Master plan and critical compound images preloaded successfully');
            } catch (error) {
                console.warn('Failed to preload some critical images:', error);
            }
        };
        
        preloadCriticalImages();
    }, []);

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

    const handleAreaChange = (area: number) => {
        console.log("Area:", area);
        setSelectedArea(area);
    };

    const [showCarousel, setShowCarousel] = useState(false);
    const [showKasakoun, setShowKasakoun] = useState(false);

    // Fetch clusters data
    useEffect(() => {
        const fetchClusters = async () => {
            if (effectRun.current) return;
            effectRun.current = true;

            try {
                const response = await axios.get("http://209.38.255.181:5001/api/clusters");
                setClusters(response.data);
            } catch (err) {
                console.error("Error fetching clusters:", err);
                setError("Failed to load clusters");
            }
        };

        fetchClusters();
    }, []);

    return (
        <div className="master-plan-container master-plan-page">
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
            <MasterPlanBackground>
                <MasterPlanSvg points={clusters} selectedArea={selectedArea} selectedType={selectedType} />
            </MasterPlanBackground>
            <MasterPlanFilter
                onTypeChange={handleTypeChange}
                onAreaChange={handleAreaChange}
            />
        </div>
    );
};

export default MasterPlan;
// TODO: Define proper props interface
import React, { useEffect, useState, useMemo } from 'react';
import { Button } from "react-bootstrap";
import { FiRotateCcw } from "react-icons/fi";
import { useParams } from "react-router-dom";
import AFront from '../SVGs/ClusterA/AFront';
import ABack from '../SVGs/ClusterA/ABack';
import BFront from '../SVGs/ClusterB/BFront';
import BBack from '../SVGs/ClusterB/BBack';
import TWFront from '../SVGs/ClusterTW/TWFront';
import TWBack from '../SVGs/ClusterTW/TWBack';
import { useCluster } from '../utils/hooks';
import LoadingScreen from '../components/LoadingScreen';
import { getAllImagePathsForView } from '../utils/helpers';

const ClusterView: React.FC = () => {
    const { clusterId } = useParams<{ clusterId: string }>();
    const [isFront, setIsFront] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    // Use React Query for data fetching
    const { data: cluster, error, isLoading } = useCluster(clusterId || '');

    // Get cluster prefix for image paths
    const clusterPrefix = useMemo(() => {
        if (clusterId?.startsWith("A")) return "A";
        if (clusterId?.startsWith("B")) return "B";
        if (clusterId?.startsWith("T")) return "TW";
        return "";
    }, [clusterId]);

    // Get image paths for preloading
    const imagePaths = useMemo(() => {
        if (!clusterPrefix) return [];
        
        // For cluster view, we need both front and back images
        const frontImages = getAllImagePathsForView(clusterPrefix, 'groundFloor'); // Using groundFloor as base
        const backImages = getAllImagePathsForView(clusterPrefix, 'groundFloor'); // Same base for back
        
        return [...frontImages, ...backImages];
    }, [clusterPrefix]);

    useEffect(() => {
        const scrollToMiddle = () => {
            const scrollY = (document.body.scrollHeight - window.innerHeight) / 2;
            window.scrollTo({ top: scrollY, behavior: "smooth" });
        };

        scrollToMiddle();
    }, [isFront]);

    const handleRotation = () => {
        setIsFront((prev) => !prev);
    };

    const handleLoadComplete = () => {
        setImagesLoaded(true);
    };

    // Show loading screen until both data and images are loaded
    if (isLoading || !imagesLoaded) {
        return (
            <LoadingScreen 
                imagesToLoad={imagePaths}
                onLoadComplete={handleLoadComplete}
                showProgress={true}
            />
        );
    }

    if (error) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="alert alert-danger">Cluster not found</div>
        </div>;
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="position-relative text-center">
                {clusterId?.indexOf('A') !== -1 ? isFront ? <AFront /> : <ABack /> : null}
                {clusterId?.indexOf('B') !== -1 ? isFront ? <BFront /> : <BBack /> : null}
                {clusterId?.indexOf('T') !== -1 ? isFront ? <TWFront /> : <TWBack /> : null}
            </div>

            <Button 
                variant="dark" 
                className="mb-3 position-fixed bottom-0 start-50 translate-middle-x cluster-view-button" 
                style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)'
                }} 
                onClick={handleRotation}
            >
               {isFront ? "Back Elevation" : "Front Elevation"} <FiRotateCcw size={18} />
            </Button>
        </div>
    );
};

export default ClusterView;
import React, { useEffect, useState } from 'react';
import { Container, Button } from "react-bootstrap";
import { FiRotateCcw } from "react-icons/fi";
import '../master.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import AFront from '../SVGs/ClusterA/AFront';
import ABack from '../SVGs/ClusterA/ABack';
import BFront from '../SVGs/ClusterB/BFront';
import BBack from '../SVGs/ClusterB/BBack';
import TWFront from '../SVGs/ClusterTW/TWFront';
import TWBack from '../SVGs/ClusterTW/TWBack';
import ClusterLayoutFilter from '../components/ClusterLayoutFilter';

const ClusterView: React.FC = () => {
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param
    const [isFront, setIsFront] = useState(true);
    const [cluster, setCluster] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scrollToMiddle = () => {
            const scrollY = (document.body.scrollHeight - window.innerHeight) / 2;
            window.scrollTo({ top: scrollY, behavior: "smooth" });
        };

        scrollToMiddle();
    }, []);

    useEffect(() => {
        async function fetchCluster() {
            try {
                const response = await axios.get(`http://localhost:5000/clusters/clusterId/${clusterId}`);
                setCluster(response.data);
            } catch (err) {
                setError("Cluster not found");
            }
        }
        fetchCluster();
    }, [clusterId]);

    const handleRotation = () => {
        setIsFront((prev) => !prev); // Toggle flip state
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <ClusterLayoutFilter layoutImage="/images/cluster-a-layout.jpg" area={180} bedroomCount={6} />

            {/* Background Image */}
            <div className="position-relative text-center">
                {clusterId?.indexOf('A') !== -1 ? isFront ? <AFront /> : <ABack /> : null}
                {clusterId?.indexOf('B') !== -1 ? isFront ? <BFront /> : <BBack /> : null}
                {clusterId?.indexOf('T') !== -1 ? isFront ? <TWFront /> : <TWBack /> : null}
            </div>

            {/* Centered Outline Button */}
            <Button variant="dark" className="mb-3  position-fixed bottom-0 start-50 translate-middle-x" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(6px)'
            }} onClick={handleRotation}>
                Rotate Building <FiRotateCcw size={18} />
            </Button>
        </div >
    );
};

export default ClusterView;
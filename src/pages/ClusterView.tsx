import React, { useEffect, useState } from 'react';
import { Box, Button } from "@chakra-ui/react";
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

const ClusterView: React.FC = () => {
    const { clusterId } = useParams<{ clusterId: string }>(); // Get route param
    const [isFront, setIsFront] = useState(true);
    const [cluster, setCluster] = useState(null);
    const [error, setError] = useState<string | null>(null);

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
        <>
            <Box position="relative" width="100vw" height="100vh">
                {/* Background Image */}
                {clusterId?.indexOf('A') !== -1 ? isFront ? <AFront /> : <ABack /> : null}
                {clusterId?.indexOf('B') !== -1 ? isFront ? <BFront /> : <BBack /> : null}
                {clusterId?.indexOf('T') !== -1 ? isFront ? <TWFront /> : <TWBack /> : null}

                {/* Centered Outline Button */}
                <Box position="absolute" top="5%" left="50%" transform="translate(-50%, -50%)" >
                    <Button
                        variant="outline" color="white" bg="black" borderColor="black"
                        display="flex" alignItems="center" gap={2} _hover={{ bg: "white", color: "black" }}
                        onClick={handleRotation} >
                        Rotate Building <FiRotateCcw className='rotateIcon' size={18} />
                    </Button>
                </Box>
            </Box>
        </>

    );
};

export default ClusterView;
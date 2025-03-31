import React, { useEffect, useRef, useState } from 'react';
import MasterPlanSvg from '../SVGs/MasterPlanSvg';
import axios from "axios";

const MasterPlan: React.FC = () => {
    const [clusters, setClusters] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const effectRun = useRef(false);

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

    return (
        <>
            <MasterPlanSvg points={clusters} />
        </>
    );
};

export default MasterPlan;
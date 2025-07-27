import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { useClusters } from "../utils/hooks";
import LoadingScreen from './LoadingScreen';
import "../styles/main.scss";

interface Villa {
    id: string;
    status: string;
    size: number;
    type: string;
}

interface Cluster {
    clusterId: string;
    clusterName: string;
    villas: Villa[];
}

const VillaSearchFromClusters: React.FC = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<{ clusterId: string; clusterName: string; villaCount: number }[]>([]);
    const [selected, setSelected] = useState<{ cluster: Cluster; villa: Villa } | null>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Use React Query for data fetching
    const { data: clustersData, error: clustersError, isLoading } = useClusters();

    // Ensure clusters is always an array - handle different response structures
    const clusters: Cluster[] = useMemo(() => {
        if (!clustersData) {
            return [];
        }
        
        // If it's already an array, use it directly
        if (Array.isArray(clustersData)) {
            return clustersData;
        }
        
        // If it's an object with a clusters property
        if (typeof clustersData === 'object' && clustersData.clusters) {
            return Array.isArray(clustersData.clusters) ? clustersData.clusters : [];
        }
        
        // If it's an object with a data property
        if (typeof clustersData === 'object' && clustersData.data) {
            return Array.isArray(clustersData.data) ? clustersData.data : [];
        }
        
        // If it's an object with a results property
        if (typeof clustersData === 'object' && clustersData.results) {
            return Array.isArray(clustersData.results) ? clustersData.results : [];
        }
        
        // If it's an object, try to convert it to an array
        if (typeof clustersData === 'object') {
            const objectKeys = Object.keys(clustersData);
            
            // If the object has numeric keys, it might be an array-like object
            if (objectKeys.length > 0 && !isNaN(Number(objectKeys[0]))) {
                return Object.values(clustersData);
            }
        }
        
        return [];
    }, [clustersData]);

    // Handle clusters error
    useEffect(() => {
        if (clustersError) {
            setError("Failed to load search data. Please try again.");
        } else {
            setError(null);
        }
    }, [clustersError]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setQuery(value);
        setSelected(null);
        setError(null);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            if (value.length >= 2) {
                try {
                    const matches: { clusterId: string; clusterName: string; villaCount: number }[] = [];
                    clusters.forEach((cluster: Cluster) => {
                        if (cluster.clusterId.includes(value) || cluster.clusterName.toUpperCase().includes(value)) {
                            const villaCount = cluster.villas && Array.isArray(cluster.villas) ? cluster.villas.length : 0;
                            matches.push({
                                clusterId: cluster.clusterId,
                                clusterName: cluster.clusterName,
                                villaCount: villaCount
                            });
                        }
                    });
                    setSuggestions(matches.slice(0, 10));
                } catch (err) {
                    setError("Search error occurred");
                }
            } else {
                setSuggestions([]);
            }
        }, 200);
    }, [clusters]);

    const handleSelect = (clusterId: string) => {
        try {
            const cluster = clusters.find((c: Cluster) => c.clusterId === clusterId);

            if (cluster) {
                setSelected({ cluster, villa: cluster.villas[0] }); // Use first villa as default
                setQuery(clusterId);
                setSuggestions([]);
                window.location.href = `/clusterView/${clusterId}/groundFloor`;
            } else {
                setError("Selected cluster not found");
            }
        } catch (err) {
            setError("Error selecting cluster");
        }
    };

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        setSuggestions([]);
        setError(null);
        if (!showSearch) setSelected(null);
    };

    return (
        <>
            {/* 🔍 Floating Search Button (Top Right) */}
            <Button
                variant="dark"
                onClick={toggleSearch}
                className="floating-search-button"
            >
                <AiOutlineSearch />
            </Button>

            {/* 🔍 Fixed Top-Center Input */}
            {showSearch && (
                <div
                    className="search-input-container"
                >
                    <Form.Control
                        type="text"
                        placeholder="Search villas (e.g. CL01_V101)"
                        value={query}
                        onChange={handleInputChange}
                        autoFocus
                        disabled={isLoading}
                    />

                    {/* Error Display */}
                    {error && (
                        <Alert variant="danger" className="mt-2 mb-0 search-error">
                            {error}
                        </Alert>
                    )}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="text-center mt-2">
                            <div className="loading-spinner-small">
                                <div className="spinner-ring-small"></div>
                            </div>
                            <small className="text-muted">Loading search data...</small>
                        </div>
                    )}

                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((item) => (
                                <div 
                                    key={item.clusterId} 
                                    onClick={() => handleSelect(item.clusterId)}
                                    className="suggestion-item"
                                >
                                    {item.clusterName}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Suggestions Message */}
                    {query.length >= 2 && suggestions.length === 0 && !isLoading && (
                        <div className="mt-2 p-2 text-muted search-no-results">
                            No matches found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default VillaSearchFromClusters;

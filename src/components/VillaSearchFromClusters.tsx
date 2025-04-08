import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Form, Dropdown, Card, Container, Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

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
    const [clusters, setClusters] = useState<Cluster[]>([]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selected, setSelected] = useState<{ cluster: Cluster; villa: Villa } | null>(null);
    const [showSearch, setShowSearch] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        axios.get("http://localhost:5000/clusters", { withCredentials: true }).then((res) => {
            setClusters(res.data);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setQuery(value);
        setSelected(null);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            if (value.length >= 2) {
                const matches: string[] = [];
                clusters.forEach((cluster) => {
                    cluster.villas.forEach((villa) => {
                        const combinedId = `${cluster.clusterId}_${villa.id}`;
                        if (combinedId.includes(value)) {
                            matches.push(combinedId);
                        }
                    });
                });
                setSuggestions(matches.slice(0, 10));
            } else {
                setSuggestions([]);
            }
        }, 200);
    };

    const handleSelect = (combinedId: string) => {
        const [clusterId, villaId] = combinedId.split("_");
        const cluster = clusters.find((c) => c.clusterId === clusterId);
        const villa = cluster?.villas.find((v) => v.id === villaId);
        if (cluster && villa) {
            setSelected({ cluster, villa });
        }
        setQuery(combinedId);
        setSuggestions([]);
        window.location.href = `/clusterView/${clusterId}/groundFloor`;
    };

    const toggleSearch = () => {
        setShowSearch((prev) => !prev);
        setSuggestions([]);
        if (!showSearch) setSelected(null);
    };

    return (
        <>
            {/* 🔍 Floating Search Button (Top Right) */}
            <Button
                variant="dark"
                onClick={toggleSearch}
                style={{
                    position: "fixed",
                    top: "10%",
                    right: "20px",
                    zIndex: 9999,
                    border: "none",
                    fontSize: "1.5rem",
                }}
            >
                <AiOutlineSearch />
            </Button>

            {/* 🔍 Fixed Top-Center Input */}
            {showSearch && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        maxWidth: "400px",
                        zIndex: 9999,
                    }}
                >
                    <Form.Control
                        type="text"
                        placeholder="Search (e.g. CL01_V101)"
                        value={query}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    {suggestions.length > 0 && (
                        <Dropdown.Menu show className="w-100 shadow-sm border rounded mt-1 position-static">
                            {suggestions.map((item) => (
                                <Dropdown.Item key={item} onClick={() => handleSelect(item)}>
                                    {item}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    )}
                </div>
            )}
        </>
    );
};

export default VillaSearchFromClusters;

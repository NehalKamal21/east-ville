// Panorama data validation and fixing utilities

export interface PanoramaLocation {
  id: string;
  name: string;
  imgName: string;
  hotspots: Array<{
    pitch: number;
    yaw: number;
    target: string;
  }>;
}

export interface PanoramaFloor {
  [locationKey: string]: PanoramaLocation;
}

export interface PanoramaCluster {
  [floorKey: string]: PanoramaFloor;
}

export interface PanoramaData {
  [clusterKey: string]: PanoramaCluster;
}

// Validate panorama data and fix common issues
export const validateAndFixPanoramaData = (data: PanoramaData): PanoramaData => {
  const fixedData = { ...data };

  Object.keys(fixedData).forEach(clusterKey => {
    const cluster = fixedData[clusterKey];
    
    Object.keys(cluster).forEach(floorKey => {
      const floor = cluster[floorKey];
      const locationKeys = Object.keys(floor);
      
      locationKeys.forEach(locationKey => {
        const location = floor[locationKey];
        
        // Fix hotspots that target themselves
        if (location.hotspots) {
          location.hotspots = location.hotspots.filter(hotspot => {
            if (hotspot.target === locationKey) {
              console.warn(`Removing self-referencing hotspot in ${clusterKey}/${floorKey}/${locationKey}`);
              return false;
            }
            
            // Check if target location exists
            if (!floor[hotspot.target]) {
              console.warn(`Hotspot target not found: ${hotspot.target} in ${clusterKey}/${floorKey}/${locationKey}`);
              return false;
            }
            
            return true;
          });
        }
      });
    });
  });

  return fixedData;
};

// Get available locations for a specific cluster and floor
export const getAvailableLocations = (
  data: PanoramaData,
  clusterKey: string,
  floorKey: string
): string[] => {
  const cluster = data[clusterKey];
  if (!cluster) return [];
  
  const floor = cluster[floorKey];
  if (!floor) return [];
  
  return Object.keys(floor);
};

// Get navigation options for a specific location
export const getNavigationOptions = (
  data: PanoramaData,
  clusterKey: string,
  floorKey: string,
  locationKey: string
): string[] => {
  const cluster = data[clusterKey];
  if (!cluster) return [];
  
  const floor = cluster[floorKey];
  if (!floor) return [];
  
  const location = floor[locationKey];
  if (!location || !location.hotspots) return [];
  
  return location.hotspots.map(hotspot => hotspot.target);
};

// Validate that a navigation target exists
export const isValidNavigationTarget = (
  data: PanoramaData,
  clusterKey: string,
  floorKey: string,
  targetLocation: string
): boolean => {
  const cluster = data[clusterKey];
  if (!cluster) return false;
  
  const floor = cluster[floorKey];
  if (!floor) return false;
  
  return targetLocation in floor;
};

// Get the image path for a specific location
export const getLocationImagePath = (
  data: PanoramaData,
  clusterKey: string,
  floorKey: string,
  locationKey: string
): string | null => {
  const cluster = data[clusterKey];
  if (!cluster) return null;
  
  const floor = cluster[floorKey];
  if (!floor) return null;
  
  const location = floor[locationKey];
  if (!location) return null;
  
  return location.imgName;
}; 
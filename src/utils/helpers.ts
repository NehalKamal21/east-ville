import { panoramaData } from './panoData';

export const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

export const eastVilleLocation: google.maps.LatLngLiteral = {
  lat: 30.04620586690839,
  lng: 31.572817028510652,
};

export const polygonCoordinates: google.maps.LatLngLiteral[] = [
  { lng: -328.4253243, lat: 30.043646 },
  { lng: -328.4289122, lat: 30.0431039 },
  { lng: -328.428719, lat: 30.0444966 },
  { lng: -328.4286761, lat: 30.0451651 },
  { lng: -328.4286547, lat: 30.0455737 },
  { lng: -328.428719, lat: 30.0461865 },
  { lng: -328.4287405, lat: 30.0466693 },
  { lng: -328.4287834, lat: 30.0470964 },
  { lng: -328.4288693, lat: 30.0475049 },
  { lng: -328.4291267, lat: 30.0489405 },
  { lng: -328.4253502, lat: 30.0491913 },
  { lng: -328.4254843, lat: 30.0481056 },
  { lng: -328.4255058, lat: 30.0478688 },
  { lng: -328.4255594, lat: 30.0475764 },
  { lng: -328.4256023, lat: 30.0472978 },
  { lng: -328.4256452, lat: 30.0470007 },
  { lng: -328.425656, lat: 30.046764 },
  { lng: -328.4256667, lat: 30.0464761 },
  { lng: -328.4256667, lat: 30.0460815 },
  { lng: -328.425656, lat: 30.0457334 },
  { lng: -328.4256238, lat: 30.0453016 },
  { lng: -328.4255916, lat: 30.0449163 },
  { lng: -328.4255379, lat: 30.044582 },
  { lng: -328.4254628, lat: 30.0441967 },
  { lng: -328.4253725, lat: 30.0438255 },
  { lng: -328.4253243, lat: 30.0436491 },
];

export const polygonOptions: google.maps.PolygonOptions = {
  fillColor: "lightblue",
  fillOpacity: 0.4,
  strokeColor: "blue",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  draggable: false,
  editable: false,
  geodesic: false,
};

// Function to create marker icons after Google Maps API is loaded
export const createMarkerIcons = () => {
  if (typeof google === 'undefined') {
    return {};
  }

  // Base map pin icon from Flaticon
  const basePinIcon = {
    url: '/map-pin-icon.png',
    scaledSize: new google.maps.Size(60, 60),
    anchor: new google.maps.Point(20, 40), // Anchor at bottom center of pin
  };

  return {
    residential: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    sports: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    commercial: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    education: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
    default: {
      ...basePinIcon,
      // You can add custom styling here if needed
    },
  };
};

export const locations = [
  {
    position: { lat: 30.06511172585654, lng: 31.593887180771073 },
    title: "Mountain View iCity",
    type: "residential",
  },
  {
    position: { lat: 30.06025650522822, lng: 31.598553096116312 },
    title: "Palm Hills",
    type: "residential",
  },
  {
    position: { lat: 30.023462004037487, lng: 31.570092734133954 },
    title: "City Gate",
    type: "residential",
  },
  {
    position: { lat: 30.039789441702425, lng: 31.554410853788273 },
    title: "Al Ahly Sporting Club",
    type: "sports",
  },
  {
    position: { lat: 30.031265110957953, lng: 31.540652434331953 },
    title: "The Drive2 by Waterway",
    type: "commercial",
  },
  {
    position: { lat: 30.026657678388094, lng: 31.537908729175314 },
    title: "Lake View Residence",
    type: "residential",
  },
  {
    position: { lat: 30.007344708483004, lng: 31.540707334929824 },
    title: "Emaar Mivida",
    type: "residential",
  },
  {
    position: { lat: 30.024831912211155, lng: 31.50153637346938 },
    title: "AUC New Cairo",
    type: "education",
  },
];

export interface Hotspot {
  pitch: number;
  yaw: number;
  target: {
    location: string;
  };
}

export interface Location {
  id: string;
  name: string;
  imgName: string;
  hotspots: Hotspot[];
}

export interface Floor {
  [location: string]: Location;
}

export interface Cluster {
  groundFloor?: Floor;
  firstFloor?: Floor;
  secondFloor?: Floor;
  Roof?: Floor;
}

export interface PanoData {
  ClusterA?: Cluster;
  ClusterB?: Cluster;
  ClusterTW?: Cluster;
}

/**
 * Extracts image paths from SVG components for preloading
 * @param clusterId - The cluster ID (e.g., 'A', 'B', 'TW')
 * @param floorId - The floor ID (e.g., 'groundFloor', 'firstFloor', 'secondFloor', 'Roof')
 * @returns Array of image paths to preload
 */
export const getSvgImagePaths = (clusterId: string, floorId: string): string[] => {
  const imagePaths: string[] = [];
  
  // Base path for cluster assets
  const basePath = `/src/assets/cluster${clusterId.toLowerCase()}`;
  
  // Common image patterns for each floor
  const floorImages: Record<string, string[]> = {
    groundFloor: [
      `${basePath}/AGroundFloor/image_27b1e69b.png`,
      `${basePath}/AGroundFloor/image_34ef8e10.png`,
      `${basePath}/AGroundFloor/image_4378a9b0.png`,
      `${basePath}/AGroundFloor/image_7fc8ae7b.png`,
      `${basePath}/AGroundFloor/image_80ea181a.png`,
      `${basePath}/AGroundFloor/image_ab601311.png`,
      `${basePath}/AGroundFloor/image_cea36707.png`,
      `${basePath}/AGroundFloor/image_e3dba228.png`,
      `${basePath}/AGroundFloor/image_f48a940d.png`,
    ],
    firstFloor: [
      `${basePath}/AFirstFloor/image_259f4b31.png`,
      `${basePath}/AFirstFloor/image_3ddb5d61.png`,
      `${basePath}/AFirstFloor/image_48e72a08.png`,
      `${basePath}/AFirstFloor/image_4d8f2fa1.png`,
      `${basePath}/AFirstFloor/image_59e36c1d.png`,
      `${basePath}/AFirstFloor/image_5a02debb.png`,
      `${basePath}/AFirstFloor/image_9722bc5c.png`,
      `${basePath}/AFirstFloor/image_a7e18dca.png`,
      `${basePath}/AFirstFloor/image_da86f081.png`,
      `${basePath}/AFirstFloor/image_e2912d53.png`,
    ],
    secondFloor: [
      `${basePath}/ASecondFloor/image_34d4d63b.png`,
      `${basePath}/ASecondFloor/image_3503f3c6.png`,
      `${basePath}/ASecondFloor/image_55d5f099.png`,
      `${basePath}/ASecondFloor/image_6a4a7b03.png`,
      `${basePath}/ASecondFloor/image_87f4cbc5.png`,
      `${basePath}/ASecondFloor/image_8981182b.png`,
      `${basePath}/ASecondFloor/image_c0e80be6.png`,
      `${basePath}/ASecondFloor/image_dc92bf35.png`,
    ],
    Roof: [
      `${basePath}/ARoof/image_047d556f.png`,
      `${basePath}/ARoof/image_0d691623.png`,
      `${basePath}/ARoof/image_2f85a7ce.png`,
      `${basePath}/ARoof/image_3d17e53f.png`,
      `${basePath}/ARoof/image_4fa2920c.png`,
      `${basePath}/ARoof/image_b879f188.png`,
      `${basePath}/ARoof/image_d4190ae6.png`,
    ]
  };

  // Return images for the specific floor, or empty array if not found
  return floorImages[floorId] || [];
};

/**
 * Gets panorama image paths for a specific cluster and floor
 * @param clusterId - The cluster ID
 * @param floorId - The floor ID
 * @returns Array of panorama image paths
 */
export const getPanoramaImagePaths = (clusterId: string, floorId: string): string[] => {
  const clusterName = `Cluster${clusterId}` as keyof typeof panoramaData;
  
  const clusterData = panoramaData[clusterName];
  if (!clusterData) return [];
  
  const floorData = clusterData[floorId as keyof typeof clusterData];
  if (!floorData) return [];
  
  const imagePaths: string[] = [];
  
  // Extract image paths from panorama data
  Object.values(floorData).forEach((location: any) => {
    if (location.imgName) {
      imagePaths.push(location.imgName);
    }
  });
  
  return imagePaths;
};

/**
 * Combines all image paths that need to be preloaded for a specific view
 * @param clusterId - The cluster ID
 * @param floorId - The floor ID
 * @returns Array of all image paths to preload
 */
export const getAllImagePathsForView = (clusterId: string, floorId: string): string[] => {
  const svgImages = getSvgImagePaths(clusterId, floorId);
  const panoramaImages = getPanoramaImagePaths(clusterId, floorId);
  
  return [...svgImages, ...panoramaImages];
};

/**
 * Validates panorama image properties to prevent black diamond issues
 * @param imagePath - Path to the panorama image
 * @returns Promise<{isValid: boolean, issues: string[], dimensions: {width: number, height: number}}>
 */
export const validatePanoramaImage = (imagePath: string): Promise<{
  isValid: boolean;
  issues: string[];
  dimensions: { width: number; height: number };
}> => {
  return new Promise((resolve) => {
    const img = new Image();
    const issues: string[] = [];

    img.onload = () => {
      const { width, height } = img;
      const aspectRatio = width / height;

      // Check aspect ratio (should be 2:1 for equirectangular panoramas)
      if (Math.abs(aspectRatio - 2) > 0.1) {
        issues.push(`Incorrect aspect ratio: ${aspectRatio.toFixed(2)} (expected 2:1)`);
      }

      // Check minimum resolution
      if (width < 1024 || height < 512) {
        issues.push(`Low resolution: ${width}x${height} (recommended minimum: 2048x1024)`);
      }

      // Check if dimensions are reasonable for panorama
      if (width < height) {
        issues.push('Image appears to be portrait orientation (should be landscape)');
      }

      resolve({
        isValid: issues.length === 0,
        issues,
        dimensions: { width, height }
      });
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        issues: ['Failed to load image'],
        dimensions: { width: 0, height: 0 }
      });
    };

    img.src = imagePath;
  });
};

/**
 * Preloads an image and returns a promise
 * @param src - Image source path
 * @returns Promise<HTMLImageElement>
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Checks if all panorama images in a directory are valid
 * @param imagePaths - Array of image paths to validate
 * @returns Promise<{valid: string[], invalid: Array<{path: string, issues: string[]}>}>
 */
export const validatePanoramaImages = async (imagePaths: string[]) => {
  const results = await Promise.allSettled(
    imagePaths.map(async (path) => {
      const validation = await validatePanoramaImage(path);
      return { path, ...validation };
    })
  );

  const valid: string[] = [];
  const invalid: Array<{ path: string; issues: string[] }> = [];

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      if (result.value.isValid) {
        valid.push(result.value.path);
      } else {
        invalid.push({
          path: result.value.path,
          issues: result.value.issues
        });
      }
    } else {
      invalid.push({
        path: 'unknown',
        issues: [result.reason?.message || 'Unknown error']
      });
    }
  });

  return { valid, invalid };
};
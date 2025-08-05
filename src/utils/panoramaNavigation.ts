import { NavigateFunction } from 'react-router-dom';

export interface PanoramaConfig {
  clusterId: string;
  floorId: string;
  location: string;
}

/**
 * Global function to handle panorama navigation
 * @param navigate - React Router navigate function
 * @param clusterId - Current cluster ID from URL params
 * @param floorId - Current floor ID from URL params
 * @param location - Target panorama location
 */
export const handlePanoramaClick = (
  navigate: NavigateFunction,
  clusterId: string | undefined,
  floorId: string | undefined,
  location: string
) => {
  console.log('handlePanoramaClick called with:', { clusterId, floorId, location });
  
  // Determine the cluster prefix based on the clusterId
  let clusterPrefix = 'A'; // default
  if (clusterId?.startsWith('B')) {
    clusterPrefix = 'B';
  } else if (clusterId?.startsWith('TW')) {
    clusterPrefix = 'TW';
  }

  console.log('Determined clusterPrefix:', clusterPrefix);

  const panoramaConfig: PanoramaConfig = {
    clusterId: clusterPrefix,
    floorId: floorId || 'groundFloor',
    location: location
  };

  console.log('Setting panoramaConfig:', panoramaConfig);
  localStorage.setItem('panoramaConfig', JSON.stringify(panoramaConfig));
  navigate(`/clusterView/${clusterId}/${floorId}/image`);
};

/**
 * Hook-style function that returns the click handler
 * @param navigate - React Router navigate function
 * @param clusterId - Current cluster ID from URL params
 * @param floorId - Current floor ID from URL params
 * @returns Function that takes a location string and handles panorama navigation
 */
export const usePanoramaClick = (
  navigate: NavigateFunction,
  clusterId: string | undefined,
  floorId: string | undefined
) => {
  return (location: string) => handlePanoramaClick(navigate, clusterId, floorId, location);
}; 
// Test utility for panorama data validation
import { panoramaData } from './panoData';
import { validateAndFixPanoramaData, getAvailableLocations, getNavigationOptions } from './panoramaValidation';

export const testPanoramaData = () => {
  console.log('=== Testing Panorama Data ===');
  
  // Test validation
  const validatedData = validateAndFixPanoramaData(panoramaData);
  console.log('Validated data:', validatedData);
  
  // Test each cluster
  Object.keys(panoramaData).forEach(clusterKey => {
    console.log(`\n--- Testing Cluster: ${clusterKey} ---`);
    
    const cluster = panoramaData[clusterKey as keyof typeof panoramaData];
    Object.keys(cluster).forEach(floorKey => {
      console.log(`\nFloor: ${floorKey}`);
      
      const availableLocations = getAvailableLocations(panoramaData, clusterKey, floorKey);
      console.log('Available locations:', availableLocations);
      
      availableLocations.forEach(locationKey => {
        const navigationOptions = getNavigationOptions(panoramaData, clusterKey, floorKey, locationKey);
        console.log(`  ${locationKey}: can navigate to [${navigationOptions.join(', ')}]`);
        
        // Check if image exists
        const location = (cluster as any)[floorKey]?.[locationKey];
        if (location?.imgName) {
          console.log(`    Image: ${location.imgName}`);
        } else {
          console.warn(`    No image found for ${locationKey}`);
        }
      });
    });
  });
  
  console.log('\n=== End Test ===');
};

// Run the test if this file is imported
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    testPanoramaData();
  }, 1000);
} 
// Debug utility for testing panorama image loading

export const testImageLoading = (imagePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${imagePath}`);
      resolve(true);
    };
    img.onerror = () => {
      console.error(`❌ Failed to load image: ${imagePath}`);
      resolve(false);
    };
    img.src = imagePath;
  });
};

export const testPanoramaImages = async () => {
  console.log('=== Testing Panorama Images ===');
  
  const testImages = [
    '/panos/ClusterA/groundFloor/01.jpg',
    '/panos/ClusterA/groundFloor/02.jpg',
    '/panos/ClusterA/groundFloor/03.jpg',
    '/panos/ClusterA/groundFloor/04.jpg',
    '/panos/ClusterB/groundFloor/01.jpg',
    '/panos/ClusterB/groundFloor/02.jpg',
    '/panos/ClusterB/groundFloor/04.jpg',
    '/panos/ClusterTW/groundFloor/01.jpg',
    '/panos/ClusterTW/groundFloor/02.jpg',
    '/panos/ClusterTW/groundFloor/04.jpg',
  ];
  
  const results = await Promise.all(
    testImages.map(async (imagePath) => {
      const success = await testImageLoading(imagePath);
      return { imagePath, success };
    })
  );
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successfully loaded: ${successful.length}/${results.length} images`);
  if (failed.length > 0) {
    console.error('❌ Failed to load:', failed.map(f => f.imagePath));
  }
  
  return results;
};

// Run the test if this file is imported
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    testPanoramaImages();
  }, 2000);
} 
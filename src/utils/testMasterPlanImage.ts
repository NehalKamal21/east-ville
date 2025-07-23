// Test utility for master plan background image

export const testMasterPlanImage = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      console.log('✅ Master plan background image loaded successfully');
      resolve(true);
    };
    img.onerror = () => {
      console.error('❌ Failed to load master plan background image');
      resolve(false);
    };
    img.src = '/assets/masterplan/image_1.png';
  });
};

// Run the test if this file is imported
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    testMasterPlanImage();
  }, 1000);
} 
// Comprehensive image preloader for all application images

import { loadingManager } from './loadingManager';

// All master plan images (public assets)
export const masterPlanImages = [
  '/assets/masterplan/image_1.png',
  '/assets/masterplan/image_2.png',
  '/assets/masterplan/image_3.png',
  '/assets/masterplan/image_4.png',
  '/assets/masterplan/image_5.png',
  '/assets/masterplan/image_6.png',
  '/assets/masterplan/image_7.png',
  '/assets/masterplan/image_8.png',
  '/assets/masterplan/image_9.png',
  '/assets/masterplan/image_10.png',
  '/assets/masterplan/image_11.png',
  '/assets/masterplan/image_12.png',
  '/assets/masterplan/image_13.png',
  '/assets/masterplan/image_14.png',
  '/assets/masterplan/image_15.png',
  '/assets/masterplan/image_16.png',
  '/assets/masterplan/image_17.png',
  '/assets/masterplan/image_18.png',
  '/assets/masterplan/image_19.png',
  '/assets/masterplan/image_20.png',
  '/assets/masterplan/image_21.png',
  '/assets/masterplan/image_22.png',
  '/assets/masterplan/image_23.png',
  '/assets/masterplan/image_24.png',
  '/assets/masterplan/image_25.png',
  '/assets/masterplan/image_26.png',
  '/assets/masterplan/image_27.png',
  '/assets/masterplan/image_28.png',
  '/assets/masterplan/image_29.png',
  '/assets/masterplan/image_30.png',
  '/assets/masterplan/image_31.png',
  '/assets/masterplan/image_32.png',
  '/assets/masterplan/image_33.png',
  '/assets/masterplan/image_34.png',
  '/assets/masterplan/image_35.png',
  '/assets/masterplan/image_36.png',
  '/assets/masterplan/image_37.png',
  '/assets/masterplan/image_38.png',
  '/assets/masterplan/image_39.png',
  '/assets/masterplan/image_40.png',
  '/assets/masterplan/image_41.png',
  '/assets/masterplan/image_42.png',
  '/assets/masterplan/image_43.png',
  '/assets/masterplan/image_44.png',
  '/assets/masterplan/image_45.png',
  '/assets/masterplan/image_46.png',
  '/assets/masterplan/image_47.png',
  '/assets/masterplan/image_48.png',
  '/assets/masterplan/image_49.png',
  '/assets/masterplan/image_50.png',
  '/assets/masterplan/image_51.png',
  '/assets/masterplan/image_52.png',
  '/assets/masterplan/image_53.png',
  '/assets/masterplan/image_54.png',
  '/assets/masterplan/image_55.png',
];

// Critical UI images
export const criticalImages = [
  '/ajna-logo.jpg',
  '/icons/360-degrees-icon.png',
  '/map-pin-icon.png',
  '/arrow-down-marker.png',
  '/marker-icon.png',
  '/eastville.png',
  '/floorPlan.png',
  '/FRONT.png',
];

// Kasakoun gallery images
export const kasakounImages = [
  // 1 Bedroom
  '/KASAKOUN/1%20BEDROOM/1.jpg',
  '/KASAKOUN/1%20BEDROOM/2.jpg',
  '/KASAKOUN/1%20BEDROOM/3.jpg',
  '/KASAKOUN/1%20BEDROOM/4.jpg',
  '/KASAKOUN/1%20BEDROOM/5.jpg',
  '/KASAKOUN/1%20BEDROOM/6.jpg',
  // 2 Bedroom
  '/KASAKOUN/2%20BEDROOM/1.jpg',
  '/KASAKOUN/2%20BEDROOM/2.jpg',
  '/KASAKOUN/2%20BEDROOM/3.jpg',
  '/KASAKOUN/2%20BEDROOM/4.jpg',
  '/KASAKOUN/2%20BEDROOM/5.jpg',
  '/KASAKOUN/2%20BEDROOM/6.jpg',
  '/KASAKOUN/2%20BEDROOM/7.jpg',
  '/KASAKOUN/2%20BEDROOM/8.jpg',
  // Corridor
  '/KASAKOUN/Corridor/1.jpg',
  '/KASAKOUN/Corridor/2.jpg',
  '/KASAKOUN/Corridor/3.jpg',
  // Entrance
  '/KASAKOUN/ENTRANCE/1.jpg',
  '/KASAKOUN/ENTRANCE/2.jpg',
  '/KASAKOUN/ENTRANCE/3.jpg',
  '/KASAKOUN/ENTRANCE/4.jpg',
  '/KASAKOUN/ENTRANCE/5.jpg',
  // Studio
  '/KASAKOUN/STUDIO/1.jpg',
  '/KASAKOUN/STUDIO/2.jpg',
  '/KASAKOUN/STUDIO/3.jpg',
  '/KASAKOUN/STUDIO/4.jpg',
  '/KASAKOUN/STUDIO/5.jpg',
  '/KASAKOUN/STUDIO/6.jpg',
];

// Panorama images
export const panoramaImages = [
  // Cluster A
  '/panos/ClusterA/groundFloor/01.jpg',
  '/panos/ClusterA/groundFloor/02.jpg',
  '/panos/ClusterA/groundFloor/03.jpg',
  '/panos/ClusterA/groundFloor/04.jpg',
  '/panos/ClusterA/firstFloor/00.jpg',
  '/panos/ClusterA/firstFloor/01.jpg',
  '/panos/ClusterA/firstFloor/02.jpg',
  '/panos/ClusterA/firstFloor/03.jpg',
  '/panos/ClusterA/firstFloor/04.jpg',
  '/panos/ClusterA/firstFloor/05.jpg',
  '/panos/ClusterA/secondFloor/01.jpg',
  '/panos/ClusterA/secondFloor/02.jpg',
  '/panos/ClusterA/secondFloor/03.jpg',
  '/panos/ClusterA/secondFloor/04.jpg',
  '/panos/ClusterA/secondFloor/05.jpg',
  '/panos/ClusterA/Roof/01.jpg',
  '/panos/ClusterA/Roof/02.jpg',
  // Cluster B
  '/panos/ClusterB/groundFloor/01.jpg',
  '/panos/ClusterB/groundFloor/02.jpg',
  '/panos/ClusterB/groundFloor/04.jpg',
  '/panos/ClusterB/firstFloor/00.jpg',
  '/panos/ClusterB/firstFloor/01.jpg',
  '/panos/ClusterB/firstFloor/02.jpg',
  '/panos/ClusterB/firstFloor/03.jpg',
  '/panos/ClusterB/firstFloor/04.jpg',
  '/panos/ClusterB/firstFloor/05.jpg',
  '/panos/ClusterB/secondFloor/01.jpg',
  '/panos/ClusterB/secondFloor/02.jpg',
  '/panos/ClusterB/secondFloor/03.jpg',
  '/panos/ClusterB/secondFloor/04.jpg',
  '/panos/ClusterB/secondFloor/05.jpg',
  '/panos/ClusterB/secondFloor/07.jpg',
  '/panos/ClusterB/Roof/01.jpg',
  '/panos/ClusterB/Roof/02.jpg',
  // Cluster TW
      '/panos/ClusterTW/groundFloor/01.jpg',
    '/panos/ClusterTW/groundFloor/02.jpg',
    '/panos/ClusterTW/groundFloor/04.jpg',
  '/panos/ClusterTW/firstFloor/01.jpg',
  '/panos/ClusterTW/firstFloor/02.jpg',
  '/panos/ClusterTW/firstFloor/03.jpg',
  '/panos/ClusterTW/firstFloor/04.jpg',
  '/panos/ClusterTW/firstFloor/05.jpg',
  '/panos/ClusterTW/firstFloor/06.jpg',
  '/panos/ClusterTW/secondFloor/01.jpg',
  '/panos/ClusterTW/secondFloor/02.jpg',
  '/panos/ClusterTW/secondFloor/04.jpg',
  '/panos/ClusterTW/secondFloor/04.B.jpg',
  '/panos/ClusterTW/secondFloor/05.jpg',
  '/panos/ClusterTW/secondFloor/06.jpg',
  '/panos/ClusterTW/Roof/01.jpg',
  '/panos/ClusterTW/Roof/02.jpg',
];

// 360 exterior images
export const exteriorImages = [
  '/360Ext/A.jpg',
  '/360Ext/B.jpg',
  '/360Ext/C.jpg',
  '/360Ext/D.jpg',
  '/360Ext/E.jpg',
  '/360Ext/F.jpg',
  '/360Ext/G.jpg',
  '/360Ext/H.jpg',
  '/360Ext/I.jpg',
  '/360Ext/J.jpg',
  '/360Ext/K.jpg',
  '/360Ext/L.jpg',
  '/360Ext/M.jpg',
];

// Preload a single image
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Image preloaded: ${src}`);
      resolve();
    };
    
    img.onerror = () => {
      console.warn(`⚠️ Failed to preload: ${src}`);
      reject(new Error(`Failed to preload: ${src}`));
    };
    
    img.crossOrigin = 'anonymous';
    img.src = src;
  });
};

// Preload multiple images with progress tracking
export const preloadImages = async (
  images: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> => {
  let loaded = 0;
  const total = images.length;
  
  const promises = images.map(async (src) => {
    try {
      await preloadImage(src);
      loaded++;
      onProgress?.(loaded, total);
    } catch (error) {
      console.warn(`Failed to preload image: ${src}`, error);
      loaded++;
      onProgress?.(loaded, total);
    }
  });
  
  await Promise.allSettled(promises);
};

// Register all images with loading manager
export const registerAllImages = () => {
  // Register critical images
  criticalImages.forEach((src, index) => {
    loadingManager.registerItem(`critical-${index}`, src, 'image', 'critical');
  });
  
  // Register master plan background as critical
  loadingManager.registerItem('master-plan-bg', masterPlanImages[0], 'image', 'critical');
  
  // Register first few master plan images as high priority
  masterPlanImages.slice(1, 10).forEach((src, index) => {
    loadingManager.registerItem(`masterplan-${index + 1}`, src, 'image', 'high');
  });
  
  // Register first few panorama images as high priority
  panoramaImages.slice(0, 10).forEach((src, index) => {
    loadingManager.registerItem(`panorama-${index}`, src, 'image', 'high');
  });
  
  // Register first few kasakoun images
  kasakounImages.slice(0, 10).forEach((src, index) => {
    loadingManager.registerItem(`kasakoun-${index}`, src, 'image', 'normal');
  });
  
  // Register exterior images
  exteriorImages.forEach((src, index) => {
    loadingManager.registerItem(`exterior-${index}`, src, 'image', 'high');
  });
};

// Comprehensive preloading strategy
export const preloadAllCriticalImages = async (): Promise<void> => {
  console.log('🚀 Starting comprehensive image preloading...');
  
  try {
    // Preload critical images first
    console.log('📸 Preloading critical images...');
    await preloadImages(criticalImages, (loaded, total) => {
      console.log(`Critical images: ${loaded}/${total}`);
    });
    
    // Mark critical images as loaded
    criticalImages.forEach((_, index) => {
      loadingManager.markLoaded(`critical-${index}`);
    });
    
    // Preload master plan background
    console.log('🏗️ Preloading master plan background...');
    await preloadImage(masterPlanImages[0]);
    loadingManager.markLoaded('master-plan-bg');
    
    console.log('✅ Critical images preloaded successfully!');
    
  } catch (error) {
    console.warn('⚠️ Some critical images failed to preload:', error);
  }
};

// Preload remaining images in background
export const preloadRemainingImages = async (): Promise<void> => {
  console.log('🔄 Preloading remaining images in background...');
  
  try {
    // Preload remaining master plan images
    await preloadImages(masterPlanImages.slice(1), (loaded, total) => {
      if (loaded % 10 === 0) {
        console.log(`Master plan images: ${loaded}/${total}`);
      }
    });
    
    // Preload panorama images
    await preloadImages(panoramaImages.slice(0, 20));
    
    // Preload kasakoun images
    await preloadImages(kasakounImages.slice(0, 15));
    
    // Preload exterior images
    await preloadImages(exteriorImages);
    
    console.log('✅ All images preloaded successfully!');
    
  } catch (error) {
    console.warn('⚠️ Some images failed to preload:', error);
  }
}; 
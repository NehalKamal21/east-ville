#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test image loading
const testImageLoading = (imagePath) => {
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

// Check if files exist
const checkFileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
};

// Test critical images
const testCriticalImages = async () => {
  console.log('🔍 Testing critical image loading...\n');
  
  const criticalImages = [
    'src/assets/masterplan/image_1.png',
    'public/assets/masterplan/image_1.png',
    'public/ajna-logo.jpg',
    'public/icons/360-degrees-icon.png',
    'public/map-pin-icon.png'
  ];

  for (const imagePath of criticalImages) {
    const exists = checkFileExists(imagePath);
    console.log(`${exists ? '✅' : '❌'} ${imagePath} ${exists ? 'exists' : 'missing'}`);
  }

  console.log('\n📊 Image loading test completed!');
  console.log('\n💡 If you see missing images, run:');
  console.log('   npm run setup-assets');
  console.log('\n💡 To generate optimized images, run:');
  console.log('   npm run img:all');
  console.log('\n💡 To optimize SVGs, run:');
  console.log('   npm run svgo');
};

testCriticalImages().catch(console.error); 
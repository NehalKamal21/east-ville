const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../public/assets'),
];
const exts = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, filelist);
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

async function compressImage(file) {
  const stat = fs.statSync(file);
  if (stat.size < 200 * 1024) return; // Skip if already small
  const ext = path.extname(file).toLowerCase();
  let pipeline = sharp(file);
  if (['.jpg', '.jpeg', '.webp', '.avif'].includes(ext)) {
    pipeline = pipeline.jpeg({ quality: 80 }).webp({ quality: 80 }).avif({ quality: 80 });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
  }
  await pipeline.toFile(file + '.tmp');
  fs.renameSync(file + '.tmp', file);
  console.log('Compressed', file);
}

(async () => {
  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = walk(dir);
    for (const file of files) {
      await compressImage(file);
    }
  }
  console.log('Image compression complete.');
})(); 
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../public/assets'),
];
const exts = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
const sizes = [400, 800, 1600];

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

async function generateResponsive(file) {
  for (const size of sizes) {
    const ext = path.extname(file);
    const base = file.replace(ext, '');
    const outFile = `${base}_${size}w${ext}`;
    if (!fs.existsSync(outFile)) {
      await sharp(file).resize({ width: size }).toFile(outFile);
      console.log('Created', outFile);
    }
  }
}

(async () => {
  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = walk(dir);
    for (const file of files) {
      await generateResponsive(file);
    }
  }
  console.log('Responsive image generation complete.');
})(); 
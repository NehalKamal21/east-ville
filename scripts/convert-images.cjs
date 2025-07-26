const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../public/assets'),
];
const exts = ['.png', '.jpg', '.jpeg'];

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

async function convertImage(file) {
  const webpFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const avifFile = file.replace(/\.(png|jpg|jpeg)$/i, '.avif');
  if (!fs.existsSync(webpFile)) {
    await sharp(file).toFile(webpFile);
    console.log('Created', webpFile);
  }
  if (!fs.existsSync(avifFile)) {
    await sharp(file).toFile(avifFile);
    console.log('Created', avifFile);
  }
}

(async () => {
  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = walk(dir);
    for (const file of files) {
      await convertImage(file);
    }
  }
  console.log('Image conversion to WebP/AVIF complete.');
})(); 
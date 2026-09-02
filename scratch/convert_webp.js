const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');
const APP_DIR = path.join(__dirname, '../app');
const COMPONENTS_DIR = path.join(__dirname, '../components');

const imageExtensions = ['.jpg', '.jpeg', '.png'];

function findFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, extensions));
    } else {
      if (extensions.some(ext => file.toLowerCase().endsWith(ext))) {
        results.push(file);
      }
    }
  });
  return results;
}

console.log('Finding images in public...');
const images = findFiles(PUBLIC_DIR, imageExtensions);

for (const image of images) {
  const ext = path.extname(image);
  const withoutExt = image.slice(0, -ext.length);
  const webpPath = `${withoutExt}.webp`;

  try {
    console.log(`Converting ${image}...`);
    // ffmpeg with quality scale for mjpeg/webp or libwebp
    execSync(`ffmpeg -i "${image}" -q:v 75 "${webpPath}" -y`, { stdio: 'ignore' });
    fs.unlinkSync(image);
    console.log(` -> Deleted original`);
  } catch (err) {
    console.error(`Failed to convert ${image}:`, err.message);
  }
}

console.log('Conversion complete. Updating codebase...');

const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

function replaceInFiles(dir) {
  const files = findFiles(dir, codeExtensions);
  let changedFiles = 0;

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    content = content.replace(/\.jpg/g, '.webp');
    content = content.replace(/\.jpeg/g, '.webp');
    content = content.replace(/\.png/g, '.webp');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf-8');
      changedFiles++;
      console.log(`Updated references in ${path.relative(path.join(__dirname, '..'), file)}`);
    }
  });
  
  return changedFiles;
}

let totalChanged = 0;
totalChanged += replaceInFiles(APP_DIR);
totalChanged += replaceInFiles(COMPONENTS_DIR);
console.log(`Updated ${totalChanged} files in codebase.`);

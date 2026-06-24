const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

// Ensure dist is clean
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// Copy index.html
fs.copyFileSync('index.html', 'dist/index.html');

// Copy assets directory to dist/assets to preserve path structures
if (fs.existsSync('assets')) {
  copyFolderSync('assets', 'dist/assets');
}

console.log('Build completed successfully! Files copied to dist/.');

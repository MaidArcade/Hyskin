/**
 * Build script for production
 * Bundles the application for deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

console.log('🏗️  Building Hytale SkinForge...');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public files
const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.statSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
};

// Copy static files
copyDir(publicDir, path.join(distDir, 'public'));

// Copy assets if they exist
if (fs.existsSync(path.join(srcDir, 'assets'))) {
  copyDir(path.join(srcDir, 'assets'), path.join(distDir, 'public', 'assets'));
}

// Copy CSS
copyDir(path.join(srcDir, 'css'), path.join(distDir, 'public', 'css'));

// Copy JS modules
copyDir(path.join(srcDir, 'js'), path.join(distDir, 'public', 'js'));

// Copy server file
fs.copyFileSync(path.join(__dirname, 'server.js'), path.join(distDir, 'server.js'));

// Copy package files
fs.copyFileSync(path.join(__dirname, 'package.json'), path.join(distDir, 'package.json'));
fs.copyFileSync(path.join(__dirname, '.env.example'), path.join(distDir, '.env.example'));

console.log('✅ Build complete!');
console.log(`📁 Output: ${distDir}`);
console.log('\nNext steps:');
console.log('1. npm install --production');
console.log('2. Set GEMINI_API_KEY in .env');
console.log('3. npm start');

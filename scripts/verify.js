const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const translations = require(path.join(baseDir, 'js', 'translations.js'));

// 1. Verify image paths
const imgRegex = /(?:src|data-full-img)="([^"]+)"/g;
let match;
const missingImages = [];
const checkedImages = new Set();

while ((match = imgRegex.exec(html)) !== null) {
  const src = match[1];
  if (src.startsWith('assets/images/')) {
    if (!checkedImages.has(src)) {
      checkedImages.add(src);
      const fullPath = path.join(baseDir, src);
      if (!fs.existsSync(fullPath)) {
        missingImages.push(src);
      }
    }
  }
}

console.log('Checked unique image assets in HTML:', checkedImages.size);
console.log('Missing images:', missingImages.length === 0 ? 'NONE! (All 100% exist on disk)' : missingImages);

// 2. Verify i18n data attributes
const i18nRegex = /data-i18n="([^"]+)"/g;
const missingAm = [];
const missingEn = [];
const checkedKeys = new Set();

while ((match = i18nRegex.exec(html)) !== null) {
  const key = match[1];
  if (!checkedKeys.has(key)) {
    checkedKeys.add(key);
    if (!translations.am[key]) missingAm.push(key);
    if (!translations.en[key]) missingEn.push(key);
  }
}

console.log('Checked i18n translation keys in HTML:', checkedKeys.size);
console.log('Missing Amharic translations:', missingAm.length === 0 ? 'NONE! (100% covered)' : missingAm);
console.log('Missing English translations:', missingEn.length === 0 ? 'NONE! (100% covered)' : missingEn);

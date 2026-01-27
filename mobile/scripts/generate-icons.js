const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

// Brand colors
const PURPLE = '#7c3aed';
const CYAN = '#06b6d4';
const DARK_BG = '#030712';

// Generate a gradient icon with "A2Z" text
async function createIcon(size, filename, options = {}) {
  const { isAdaptive = false, isSplash = false } = options;

  const bgSize = isAdaptive ? Math.round(size * 1.5) : size;
  const padding = isAdaptive ? Math.round(size * 0.25) : Math.round(size * 0.1);
  const innerSize = size - padding * 2;
  const fontSize = isSplash ? Math.round(size * 0.08) : Math.round(innerSize * 0.32);
  const subFontSize = isSplash ? Math.round(size * 0.03) : Math.round(innerSize * 0.12);

  const cx = Math.round(bgSize / 2);
  const cy = Math.round(bgSize / 2);
  const radius = Math.round(isAdaptive ? size * 0.35 : innerSize * 0.45);

  const svg = `
    <svg width="${bgSize}" height="${bgSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${PURPLE};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${CYAN};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#e9d5ff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#a5f3fc;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${bgSize}" height="${bgSize}" fill="${DARK_BG}" />

      <!-- Gradient circle -->
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#grad)" opacity="0.9" />

      <!-- Inner dark circle -->
      <circle cx="${cx}" cy="${cy}" r="${Math.round(radius * 0.78)}" fill="${DARK_BG}" opacity="0.85" />

      <!-- A2Z text -->
      <text x="${cx}" y="${cy + Math.round(fontSize * 0.1)}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}"
        font-weight="900"
        fill="url(#textGrad)"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="${Math.round(fontSize * 0.05)}">A2Z</text>

      ${!isSplash ? '' : `
        <text x="${cx}" y="${cy + fontSize * 0.7}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="${subFontSize}"
          font-weight="600"
          fill="#94a3b8"
          text-anchor="middle"
          dominant-baseline="middle"
          letter-spacing="2">AI</text>
      `}
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .resize(bgSize, bgSize)
    .png()
    .toFile(path.join(assetsDir, filename));

  console.log(`  Created ${filename} (${bgSize}x${bgSize})`);
}

async function createFavicon(size, filename) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${PURPLE}" />
          <stop offset="100%" style="stop-color:${CYAN}" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.15)}" fill="url(#grad)" />
      <text x="${size/2}" y="${size/2 + size * 0.05}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${Math.round(size * 0.45)}"
        font-weight="900"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle">A2Z</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(path.join(assetsDir, filename));

  console.log(`  Created ${filename} (${size}x${size})`);
}

async function main() {
  console.log('Generating A2Z AI app icons...\n');

  // Ensure directory exists
  fs.mkdirSync(assetsDir, { recursive: true });

  await Promise.all([
    // App icon (1024x1024 for App Store)
    createIcon(1024, 'icon.png'),

    // Android adaptive icon foreground
    createIcon(1024, 'adaptive-icon.png', { isAdaptive: true }),

    // Splash screen icon
    createIcon(200, 'splash-icon.png', { isSplash: true }),

    // Favicon for web
    createFavicon(48, 'favicon.png'),
  ]);

  console.log('\nAll icons generated successfully!');
}

main().catch(console.error);

const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { createCanvas } = require('canvas');

// Create a simple noise texture
function generateNoise(width = 100, height = 100) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(width, height);
  const { data } = imageData;

  // Generate noise pattern
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255;
    data[i] = noise; // Red
    data[i + 1] = noise; // Green
    data[i + 2] = noise; // Blue
    data[i + 3] = 128; // Alpha (50% opacity)
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toBuffer('image/png');
}

// Generate and save the noise texture
try {
  const noiseBuffer = generateNoise(200, 200);
  fs.writeFileSync('./public/images/noise.png', noiseBuffer);
  // eslint-disable-next-line no-console
  console.log('✅ Generated noise.png texture');
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('❌ Failed to generate noise.png:', error.message);
  process.exit(1);
}

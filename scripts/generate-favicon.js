const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const sizes = [16, 32, 48];
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
  
  // Create PNG buffers for each size
  const pngBuffers = await Promise.all(
    sizes.map(size => 
      sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Combine them into an ICO file
  const ico = require('ico-endec');
  const icoBuffer = ico.encode(pngBuffers);
  
  // Save the ICO file
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  console.log('Favicon generated successfully!');
}

generateFavicon().catch(console.error); 
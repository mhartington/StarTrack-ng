/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-bitwise  */

const getPalette = (sourceImage, colorCount?: number, quality?: number) => {
  if (typeof colorCount === 'undefined' || colorCount < 2 || colorCount > 256) {
    colorCount = 10;
  }
  if (typeof quality === 'undefined' || quality < 1) {
    quality = 10;
  }

  // Create custom CanvasImage object
  const image = canvasImage(sourceImage);
  const imageData = image.getImageData();
  const pixels = imageData.data;
  const pixelCount = image.getPixelCount();

  // Store the RGB values in an array format suitable for quantize function
  const pixelArray = [];
  for (
    let i = 0, offset: number, r: number, g: number, b: number, a: number;
    i < pixelCount;
    i = i + quality
  ) {
    offset = i * 4;
    r = pixels[offset + 0];
    g = pixels[offset + 1];
    b = pixels[offset + 2];
    a = pixels[offset + 3];
    // If pixel is mostly opaque and not white
    if (a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b]);
      }
    }
  }

  // Send array to quantize function which clusters values
  // using median cut algorithm
  const cmap = MMCQ.quantize(pixelArray, colorCount);



  const palette = cmap ? cmap.palette() : null;

  // Clean up
  image.removeCanvas();

  return palette;
};

// const getColor = (sourceImage: any, quality = 10) => {
//   const palette = getPalette(sourceImage, 5, quality);
//   const dominantColor = palette[0];
//   return dominantColor;
// };
//
// const getColorFromUrl = (imageUrl: string, quality = 10) =>{
//   console.log(imageUrl);
//   return new Promise((resolve, reject) => {
//       const sourceImage = new Image();
//       sourceImage.crossOrigin = 'Anonymous';
//       sourceImage.addEventListener('load', () => {
//        const  palette = getPalette(sourceImage, 5, quality);
//         const dominantColor = palette[0];
//         resolve({ dominantColor, imageUrl });
//       });
//       sourceImage.src = imageUrl;
//       sourceImage.addEventListener('error', reject.bind(this));
//     });
// };

const getPaletteFromUrl = (imageUrl: string, quality = 10) => new Promise((resolve, reject) => {
    const sourceImage = new Image();
    sourceImage.crossOrigin = 'Anonymous';
    sourceImage.addEventListener('load', () => {
     const  palette = getPalette(sourceImage, 5, quality);
      resolve({ palette, imageUrl });
    });
    sourceImage.src = imageUrl;
    sourceImage.addEventListener('error', reject.bind(this));
  });

const canvasImage = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  document.body.appendChild(this.canvas);

  const width = canvas.width = image.width;
  const height = this.canvas.height = image.height;

  context.drawImage(image, 0, 0, this.width, this.height);

  const clear =() => context.clearRect(0, 0, this.width, this.height);
  const update = (imageData: ImageData)=> context.putImageData(imageData, 0, 0);
  const getPixelCount = () => width * height;
  const getImageData = () => context.getImageData(0, 0, width, height);
  const removeCanvas = () => canvas.parentNode.removeChild(canvas);

  return { clear, update, getPixelCount, getImageData, removeCanvas};

};

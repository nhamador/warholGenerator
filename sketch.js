let img;
let originalImg;

const sketchSize = 200;
const tileSize = 50;
const cols = sketchSize / tileSize;
const rows = sketchSize / tileSize;

const baseColorHex = '#FF0000'; // red
const color1Hex = '#00FF00'; // green
const color2Hex = '#0000FF'; // blue

let colors;

function preload() {
  originalImg = loadImage('fort2.jpg');
}

function setup() {
  createCanvas(sketchSize, sketchSize);
  img = createImage(originalImg.width, originalImg.height);
  colors = getDerivedColors();
}

function getDerivedColors() {
  return [color(baseColorHex), color(color1Hex), color(color2Hex)];
}

function applyPosterization(imgToPosterize, effect) {
  imgToPosterize.loadPixels();
  let imgCopy = imgToPosterize.get();
  imgCopy.loadPixels();

  for (let y = 0; y < imgCopy.height; y++) {
    for (let x = 0; x < imgCopy.width; x++) {
      let index = (x + y * imgCopy.width) * 4;
      let r = imgToPosterize.pixels[index];
      let g = imgToPosterize.pixels[index + 1];
      let b = imgToPosterize.pixels[index + 2];

      // Posterization
      let levels = 256;
      let posterizedR = floor(r / (256 / levels)) * (256 / levels);
      let posterizedG = floor(g / (256 / levels)) * (256 / levels);
      let posterizedB = floor(b / (256 / levels)) * (256 / levels);

      // Use the derived colors
      imgCopy.pixels[index] = colors[effect].r * posterizedR / 255;
      imgCopy.pixels[index + 1] = colors[effect].g * posterizedG / 255;
      imgCopy.pixels[index + 2] = colors[effect].b * posterizedB / 255;
    }
  }

  imgCopy.updatePixels();
  return imgCopy;
}

function draw() {
  background(255);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let effect = (x + y) % 3;
      img = applyPosterization(originalImg, effect);
      image(img, x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    saveCanvas('pop_art_screenshot', 'png');
  }
}

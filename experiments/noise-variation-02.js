function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(10);
}

const amount = 2;
const gap = 10;

const size = 7;
const divider = 10;
const numRows = 30;
const numCols = 30;

const tileSize = numCols * size;

const colors = [
  color(40, 15, 120),
  color(95, 50, 230),
  color(130, 145, 230),
  color(175, 190, 235),
];

const seeds = [1, 5, 6, 9];

let counter = 0;

//The following code is made with inspiration from the noise example shown during one of the lectures.
function drawElement(xOffset, yOffset, color, seed) {
  noStroke();
  fill(color);
  noiseSeed(seed);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      square(
        xOffset + size / 2 + x * size,
        yOffset + size / 2 + y * size,
        value
      );
    }
  }
}

function draw() {
  background(0);

  const totalWidth = amount * tileSize + (amount - 1) * gap;
  const startX = (width - totalWidth) / 2;
  const startY = (height - totalWidth) / 2;

  for (let row = 0; row < amount; row++) {
    for (let col = 0; col < amount; col++) {
      const x = startX + col * (tileSize + gap);
      const y = startY + row * (tileSize + gap);

      const index = row * amount + col;
      const tileColor = colors[index];
      const seed = seeds[index];

      push();
      translate(x, y);
      drawElement(0, 0, tileColor, seed);
      pop();
    }
  }

  counter += 0.06;
}

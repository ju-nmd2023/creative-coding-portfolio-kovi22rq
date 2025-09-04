function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 100;
const layers = 30;

//The following code was made by following Garrit's tutorial on Vera Molnár's artwork
function getRandomValue(position, variance) {
  return position + map(random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 20;
  noFill();
  strokeWeight(0.5);
  stroke(120, 150, 190);

  for (let i = 0; i < layers; i++) {
    if (random() > 0.8) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;
    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  background(255);

  const cols = 5;
  const rows = 1;
  const totalWidth = cols * size;
  const totalHeight = rows * size;

  const startX = (width - totalWidth) / 2;
  const startY = (height - totalHeight) / 2;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const positionX = startX + size / 2 + x * size;
      const positionY = startY + size / 2 + y * size;
      drawLayers(positionX, positionY, size, layers);
    }
  }

  noLoop();
}

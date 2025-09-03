function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  frameRate(3);
}

const size = 100;
const layers = 30;
const gap = 20;

//The following code was made by following Garrit's tutorial on Vera Molnár's artwork
function getRandomValue(position, variance) {
  return position + map(random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 20;
  noFill();
  strokeWeight(0.5);
  stroke(random(255), random(130), random(85));

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
  const rows = 5;
  let rotation = 0;

  let startX = (width - (cols * size + (cols - 1) * gap)) / 2;
  let startY = (height - (rows * size + (rows - 1) * gap)) / 2;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let positionX = startX + x * (size + gap);
      let positionY = startY + y * (size + gap);

      //The following code was made with help from Garrits tutorial "Grid example step 04"
      push();
      translate(positionX, positionY);
      rotate(rotation);
      drawLayers(x, y, size, layers);
      pop();

      rotation += 0.02;
    }
  }
}

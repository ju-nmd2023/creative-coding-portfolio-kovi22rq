function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 10;
const divider = 10;
const numRows = 70;
const numCols = 70;

//The following code was made with inspiration from the noise tutorial shown during one of the lectures.
function draw() {
  background(0, 0, 0);
  noStroke();
  fill(140, 10, 80);

  noiseSeed(4);
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = noise(x / divider, y / divider) * size;
      square(size / 2 + x * size, size / 2 + y * size, value);
    }
  }

  noLoop();
}

//The following code was written with help from Garrit's code tutorial on flow fields

class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.stepCount = 0;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    this.stepCount++;

    if (this.stepCount % 3 === 0) {
      push();
      noStroke();
      fill(194, 202, 209);
      ellipse(this.position.x, this.position.y, 2, 2);
      pop();
    }
  }
}

const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 4;

let field;
let agents = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  field = generateField();
  generateAgents();
}

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);

  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      let angle = noise(x / divider, y / divider) * TWO_PI;

      // The following two lines were written with some help from ChatGPT
      const quantizedAngle = Math.round(angle / (PI / 4)) * (PI / 4);
      field[x].push(p5.Vector.fromAngle(quantizedAngle));
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 800; i++) {
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      3,
      0.1
    );
    agents.push(agent);
  }
}

function draw() {
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);

    // Guard against out-of-bounds
    if (x >= 0 && x < maxCols && y >= 0 && y < maxRows) {
      const desiredDirection = field[x][y];
      agent.follow(desiredDirection);
    }

    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}

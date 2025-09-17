//The following code was written with help from Garrit's code tutorial on flow fields
//This piece is inspired by Tyler Hobbs article about different flow fields

class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    const r = random(50, 150);
    const g = random(50, 180);
    const b = random(150, 255);
    const alpha = random(100, 180); // Semi-transparent for glow effect
    this.color = color(r, g, b, alpha);
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.setMag(this.maxSpeed);
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
      this.position.x = width;
      this.lastPosition.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.lastPosition.y = height;
    } else if (this.position.y > height) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    stroke(this.color);
    strokeWeight(0.5);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
    pop();
  }
}

const fieldSize = 20;
const maxCols = Math.ceil(window.innerWidth / fieldSize);
const maxRows = Math.ceil(window.innerHeight / fieldSize);
const divider = 80; // larger = smoother noise field

let field;
let agents = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 30);
  field = generateField();
  generateAgents();
}

function generateField() {
  let field = [];
  noiseSeed(random(1000));
  for (let x = 0; x < maxCols; x++) {
    field[x] = [];
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * TWO_PI;
      field[x][y] = p5.Vector.fromAngle(value);
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 800; i++) {
    let agent = new Agent(random(width), random(height), 1.5, 0.1);
    agents.push(agent);
  }
}

function draw() {
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    let flowDir = field[x]?.[y] || createVector(0, 0);
    let desiredDirection = flowDir;

    if (mouseIsPressed) {
      // direction toward mouse
      let mouseDir = p5.Vector.sub(
        createVector(mouseX, mouseY),
        agent.position
      );
      let distToMouse = mouseDir.mag();
      mouseDir.setMag(1);

      // closer agents get pulled more strongly
      let influence = constrain(200 / distToMouse, 0, 1);

      // blend flow with mouse pull
      desiredDirection = p5.Vector.lerp(flowDir, mouseDir, influence);
    }

    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}

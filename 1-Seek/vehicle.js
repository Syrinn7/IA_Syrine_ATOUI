let vehicle;
let target;
let maxSpeedSlider, maxForceSlider;

function setup() {
  createCanvas(800, 600);

  vehicle = new Vehicle(width / 2, height / 2);
  target = new Target(random(width), random(height));  // Initialisation de la target à une position aléatoire

  maxSpeedSlider = createSlider(1, 20, 10, 1);
  maxForceSlider = createSlider(0.1, 2, 0.25, 0.05);

  maxSpeedSlider.position(10, height + 10);
  maxForceSlider.position(10, height + 40);
}

function draw() {
  background(51);

  vehicle.maxSpeed = maxSpeedSlider.value();
  vehicle.maxForce = maxForceSlider.value();

  vehicle.applyBehaviors(target.pos);
  vehicle.update();
  vehicle.show();

  target.update();
  target.show();

  // Réapparition aléatoire de la cible lorsque le véhicule l'atteint
  if (vehicle.pos.dist(target.pos) < vehicle.r + 16) {
    target.pos = createVector(random(width), random(height));
  }
}

// Classe Vehicle inchangée
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 10;
    this.maxForce = 0.25;
    this.r = 16;
  }

  applyBehaviors(target) {
    let force = this.seek(target);
    this.applyForce(force);
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.edges();
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
    this.drawVelocityVector();
  }

  drawVelocityVector() {
    push();
    strokeWeight(3);
    stroke(255, 0, 0);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
    let arrowSize = 5;
    translate(this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
    rotate(this.vel.heading());
    translate(-arrowSize / 2, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}

// Classe Target qui hérite de Vehicle
class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));  // Mouvement aléatoire
  }

  update() {
    this.pos.add(this.vel);
    this.edges();  // Réapparaît de l'autre côté lorsqu'elle quitte l'écran
  }

  show() {
    fill("green");
    noStroke();
    circle(this.pos.x, this.pos.y, 32);  // Dessin du cercle représentant la target
  }
}

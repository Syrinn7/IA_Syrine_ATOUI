class Vehicle {
  constructor(x, y, size, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    this.r = size;
    this.color = color;
    this.wanderTheta = PI / 2;
    this.trail = []; // Tableau pour stocker les positions de la traînée
    this.trailLimit = 50; // Limite de la longueur de la traînée
  }

  applyForce(force) {
    this.acc.add(force);
  }

  wander(debug) {
    // Calcul et affichage de la déambulation (comme précédemment)
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(sliderDistance.value());
    wanderPoint.add(this.pos);

    let wanderRadius = sliderRadius.value();
    let theta = this.wanderTheta + this.vel.heading();
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);

    if (debug) {
      noFill();
      stroke(255, 100);
      let centerX = this.pos.x + sliderDistance.value() * cos(this.vel.heading());
      let centerY = this.pos.y + sliderDistance.value() * sin(this.vel.heading());
      circle(centerX, centerY, wanderRadius * 2);

      stroke(255);
      line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y);

      fill(0, 255, 0);
      noStroke();
      circle(wanderPoint.x, wanderPoint.y, 8);
    }

    let steer = wanderPoint.sub(this.pos);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    this.wanderTheta += random(-sliderTheta.value(), sliderTheta.value());
  }

  update() {
    // Ajoute la position actuelle à la traînée
    this.trail.push(this.pos.copy());

    // Limite la longueur de la traînée
    if (this.trail.length > this.trailLimit) {
      this.trail.shift(); // Supprime le plus ancien élément pour limiter la longueur
    }

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    // Affiche la traînée
    noFill();
    stroke(this.color);
    beginShape();
    for (let i = 0; i < this.trail.length; i++) {
      vertex(this.trail[i].x, this.trail[i].y);
    }
    endShape();

    // Affiche le véhicule
    stroke(255);
    strokeWeight(2);
    fill(this.color);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    else if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    else if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }
}

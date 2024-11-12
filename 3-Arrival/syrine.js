// syrine.js
class Syrine {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 5;
    this.maxforce = 0.2;
  }

  update() {
    // Déplacement autonome avec un peu d'aléatoire
    let wander = p5.Vector.random2D();
    wander.setMag(0.1);
    this.applyForce(wander);

    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    fill(255, 0, 0); // Rouge pour la mouche
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

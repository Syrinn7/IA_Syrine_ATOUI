// vehicle.js
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(100); // Vitesse initiale augmentée
    this.acc = createVector();
    this.r = 10;
    this.maxSpeed = 20; // Vitesse maximale très élevée pour garantir un déplacement rapide
    this.maxForce = 10; // Force maximale augmentée pour de brusques changements de direction
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); // Limite la vitesse à maxSpeed
    this.pos.add(this.vel);
    this.acc.set(0, 0); // Réinitialise l'accélération après mise à jour
  }

  show() {
    fill(255, 255, 255); // Couleur de la cible en blanc
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  edges() {
    // Gère le rebond de la cible lorsqu'elle atteint les bords de la fenêtre
    if (this.pos.x > width - this.r || this.pos.x < this.r) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height - this.r || this.pos.y < this.r) {
      this.vel.y *= -1;
    }
  }
}

class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(6);  // Vitesse initiale aléatoire
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
  }

  update() {
    this.pos.add(this.vel);
    this.edges();  // Réapparaît du côté opposé lorsqu'elle sort du canvas
  }
}

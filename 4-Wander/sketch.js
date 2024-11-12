let vehicles = [];
let sliderDistance, sliderRadius, sliderTheta, sliderMaxSpeed, sliderMaxForce;
let debug = false; // Variable pour activer/désactiver le mode debug

function setup() {
  createCanvas(800, 600);

  sliderDistance = createSlider(50, 200, 100).position(10, height + 10);
  sliderRadius = createSlider(10, 100, 50).position(10, height + 40);
  sliderTheta = createSlider(0.1, 1.0, 0.3, 0.01).position(10, height + 70);
  sliderMaxSpeed = createSlider(1, 10, 4).position(10, height + 100);
  sliderMaxForce = createSlider(0.1, 1.0, 0.2, 0.01).position(10, height + 130);

  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(8, 20);
    let color = [random(255), random(255), random(255)];
    vehicles.push(new Vehicle(x, y, size, color));
  }
}

// Fonction pour basculer le mode debug quand la touche "d" est appuyée
function keyPressed() {
  if (key === 'd' || key === 'D') {
    debug = !debug; // Bascule entre vrai et faux
  }
}

function draw() {
  background(0);

  vehicles.forEach(vehicle => {
    vehicle.maxSpeed = sliderMaxSpeed.value();
    vehicle.maxForce = sliderMaxForce.value();
    vehicle.wander(debug); // Passe l'état du debug au véhicule
    vehicle.update();
    vehicle.show();
    vehicle.edges();
  });
}

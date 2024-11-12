let pursuer;
let target;
let sliderVitesseMaxCible, maxSpeedSlider, maxForceSlider, predictionSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer = new Vehicle(random(width), random(height));
  target = new Target(random(width), random(height));

  // Création des sliders
  maxSpeedSlider = createSlider(1, 20, 10, 1);   // Slider pour la vitesse max du véhicule poursuiveur
  maxForceSlider = createSlider(0.1, 2, 0.25, 0.05);  // Slider pour la force max du poursuiveur
  predictionSlider = createSlider(2, 30, 10, 1);  // Slider pour la durée de prédiction
  sliderVitesseMaxCible = createSlider(1, 15, 6, 1);  // Slider pour la vitesse max de la cible

  // Position des sliders dans la fenêtre
  maxSpeedSlider.position(10, height + 10);
  maxForceSlider.position(10, height + 40);
  predictionSlider.position(10, height + 70);
  sliderVitesseMaxCible.position(10, height + 100);
}

function draw() {
  background(0);

  // Mise à jour des valeurs des sliders
  pursuer.maxSpeed = maxSpeedSlider.value();
  pursuer.maxForce = maxForceSlider.value();
  let predictionFrames = predictionSlider.value();
  target.vel.setMag(sliderVitesseMaxCible.value());  // Mise à jour de la vitesse max de la cible

  // pursuer = le véhicule poursuiveur, il vise un point devant la cible
  let steering = pursuer.pursue(target, predictionFrames);  // Utilisation de la prédiction ajustée
  pursuer.applyForce(steering);

  // Déplacement et dessin du véhicule et de la cible
  pursuer.update();
  pursuer.edges();
  pursuer.show();

  target.update();
  target.edges();
  target.show();
}

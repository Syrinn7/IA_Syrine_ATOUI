let pursuer; // Mouche contrôlée par la souris
let target; // Cible en mouvement
let showVictoryMessage = false;
let font;
let victoryPoints = []; // Points pour "C'est gagné"
let victoryVehicles = []; // Véhicules pour afficher "C'est gagné"

function preload() {
  font = loadFont('Cookie-Regular.ttf'); // Charger la police
}

function setup() {
  createCanvas(2900, 2000);
  
  // Initialiser la mouche contrôlée par la souris
  pursuer = {
    pos: createVector(mouseX, mouseY),
    r: 10 // Taille de la mouche
  };
  
  // Initialiser la cible (objet) qui se déplace
  target = new Vehicle(random(width), random(height));
  
  // Points pour afficher "C'est gagné" avec plusieurs mouches
  victoryPoints = font.textToPoints("C'est gagné", 0, height / 2, 850, {
    sampleFactor: 0.1
  });
}

function draw() {
  // Fond en dégradé vertical
  let color1 = color(151, 89, 154);
  let color2 = color(109, 7, 26);
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    line(0, i, width, i);
  }

  if (!showVictoryMessage) {
    // Mettre à jour la position de la mouche pour qu'elle suive la souris
    pursuer.pos.set(mouseX, mouseY);

    // Vérifier si la mouche touche la cible
    let d = p5.Vector.dist(pursuer.pos, target.pos);
    if (d < pursuer.r + target.r) {
      showVictoryMessage = true;
      spawnVictoryVehicles(); // Faire apparaître les mouches pour le message de victoire
    }

    // Afficher la mouche (contrôlée par la souris) en cercle blanc
    fill(255); // Blanc
    noStroke();
    ellipse(pursuer.pos.x, pursuer.pos.y, pursuer.r * 2);

    // Mettre à jour et afficher la cible (objet en mouvement)
    target.edges(); // Ajoute les rebonds sur les bords
    target.update();
    target.show();
  } else {
    // Afficher le message de victoire avec les mouches si on gagne
    displayVictoryMessage();
  }
}

// Crée des véhicules pour afficher le message "C'est gagné"
function spawnVictoryVehicles() {
  victoryVehicles = [];
  for (let pt of victoryPoints) {
    let vehicle = new Vehicle(pt.x, pt.y); // Créer chaque mouche pour former le texte
    victoryVehicles.push(vehicle);
  }
}

function displayVictoryMessage() {
  // Afficher chaque mouche formant "C'est gagné"
  for (let vehicle of victoryVehicles) {
    vehicle.show(); // On n'appelle pas update() pour éviter tout déplacement
  }
}

// Réinitialiser le jeu en masquant le message de victoire
function mousePressed() {
  if (showVictoryMessage) {
    showVictoryMessage = false;
    victoryVehicles = [];
    target = new Vehicle(random(width), random(height)); // Réinitialiser la cible
  }
}

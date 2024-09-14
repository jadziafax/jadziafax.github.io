let desertColors;
let jaggedShapes = [];
let organicShapes = [];
let hazards = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220, 180, 140); // Initial 70s desert tone
  
  // Desert-inspired colors
  desertColors = [
    color(204, 102, 0),   // Orange
    color(153, 102, 51),  // Brown
    color(230, 200, 100), // Yellow
    color(100, 150, 120), // Faded green
    color(180, 90, 60)    // Muted red
  ];
  
  // Generate initial background jagged shapes
  for (let i = 0; i < 200; i++) {
    jaggedShapes.push(new JaggedShape());
  }
  
  // Generate initial organic shapes
  for (let i = 0; i < 10; i++) {
    organicShapes.push(new OrganicShape());
  }
  
  // Generate desert hazards (cacti, rocks, scorpions, etc.)
  for (let i = 0; i < 10; i++) {
    let hazardType = floor(random(1, 5)); // Randomly pick a hazard
    let x = random(width);
    let y = random(height - 100, height);
    hazards.push({type: hazardType, x: x, y: y});
  }
}

function draw() {
  // Fill the background layer with smaller, jagged elements (fast, chaotic noise)
  for (let i = 0; i < jaggedShapes.length; i++) {
    jaggedShapes[i].update();
    jaggedShapes[i].display();
  }
  
  // Overlay organic forms in the foreground (slow, Lovecraftian movement)
  for (let i = 0; i < organicShapes.length; i++) {
    organicShapes[i].update();
    organicShapes[i].display();
  }
  
  // Draw desert hazards
  for (let i = 0; i < hazards.length; i++) {
    drawHazard(hazards[i].type, hazards[i].x, hazards[i].y);
  }
  
  // Add static-like noise in the background
  drawStaticNoise();
}

// Draw desert hazard based on type
function drawHazard(type, x, y) {
  switch (type) {
    case 1: drawCactus(x, y); break;
    case 2: drawSandDune(x, y); break;
    case 3: drawRock(x, y); break;
    case 4: drawScorpion(x, y); break;
    case 5: drawSnake(x, y); break;
  }
}

// Class for background jagged shapes with rough edges
class JaggedShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 50);
    this.speed = random(0.5, 2);
    this.color = random(desertColors);
    this.rotation = random(TWO_PI);
  }

  update() {
    // Basic movement
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
    
    // Keep within bounds
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  display() {
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    // Draw a jagged, rough-edged polygon
    beginShape();
    for (let i = 0; i < 8; i++) {
      let angle = map(i, 0, 8, 0, TWO_PI);
      let radius = this.size + random(-10, 10);
      let vx = cos(angle) * radius;
      let vy = sin(angle) * radius;
      vertex(vx, vy);
    }
    endShape(CLOSE);
    pop();
  }
}

// Class for slower, organic shapes that emerge and dissipate
class OrganicShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(100, 300);
    this.growth = random(0.5, 1.5); // Speed at which shape grows and dissipates
    this.color = random(desertColors);
    this.opacity = 0;
    this.growing = true;
  }

  update() {
    if (this.growing) {
      this.size += this.growth;
      this.opacity += 1;
      if (this.size > random(300, 500)) this.growing = false; // Start shrinking
    } else {
      this.size -= this.growth * 0.5;
      this.opacity -= 2;
      if (this.opacity < 0) this.reset(); // Reset when fully faded
    }
  }

  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.opacity);
    noStroke();
    push();
    translate(this.x, this.y);
    // Organic form: rotating blob-like structure
    beginShape();
    for (let i = 0; i < TWO_PI; i += PI / 10) {
      let radius = this.size + random(-20, 20);
      let sx = cos(i) * radius;
      let sy = sin(i) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(100, 300);
    this.growth = random(0.5, 1.5);
    this.color = random(desertColors);
    this.opacity = 0;
    this.growing = true;
  }
}

// Desert hazards

function drawCactus(x, y) {
  fill(85, 107, 47);
  noStroke();
  rect(x, y - 100, 40, 100, 20); // Main cactus body
  rect(x - 30, y - 60, 20, 60, 20); // Left arm
  rect(x + 50, y - 60, 20, 60, 20); // Right arm
}

function drawSandDune(x, y) {
  fill(237, 201, 175);
  noStroke();
  beginShape();
  vertex(x, y);
  bezierVertex(x + 100, y - 50, x + 300, y - 50, x + 400, y);
  vertex(x + 400, height);
  vertex(x, height);
  endShape(CLOSE);
}

function drawRock(x, y) {
  fill(139, 69, 19);
  noStroke();
  beginShape();
  vertex(x, y);
  vertex(x + random(50, 80), y - random(30, 50));
  vertex(x + random(80, 120), y - random(60, 90));
  vertex(x + random(50, 100), y + random(10, 20));
  endShape(CLOSE);
}

function drawScorpion(x, y) {
  fill(50);
  noStroke();
  ellipse(x, y, 20, 20); // Head
  for (let i = 1; i <= 4; i++) {
    ellipse(x + i * 15, y, 20 - i * 3, 20 - i * 3); // Body segments
  }
  stroke(50);
  strokeWeight(3);
  noFill();
  arc(x + 70, y - 30, 60, 60, PI / 2, PI); // Tail
  strokeWeight(2);
  arc(x - 15, y, 20, 20, 0, PI); // Left pincer
  arc(x + 15, y, 20, 20, 0, PI); // Right pincer
}

function drawSnake(x, y) {
  stroke(34, 139, 34);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < 200; i += 10) {
    let offset = sin(i * 0.1) * 20;
    vertex(x + i, y + offset);
  }
  endShape();
  fill(34, 139, 34);
  noStroke();
  ellipse(x + 210, y, 20, 20); // Head
  fill(0);
  ellipse(x + 215, y - 5, 5, 5); // Eyes
  ellipse(x + 205, y - 5, 5, 5); 
}

// Static noise layer for added chaos
function drawStaticNoise() {
  for (let i = 0; i < 100; i++) {
    stroke(random(255), random(255), random(255), 50);
    strokeWeight(random(1, 3));
    point(random(width), random(height));
  }
}

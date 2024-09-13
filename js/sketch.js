let desertColors;
let jaggedShapes = [];
let organicShapes = [];

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

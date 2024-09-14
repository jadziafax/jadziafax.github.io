let desertColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220, 180, 140); // Initial desert tone
  
  // Define desert-inspired color palette
  desertColors = [
    color(204, 102, 0),   // Orange
    color(153, 102, 51),  // Brown
    color(230, 200, 100), // Yellow
    color(100, 150, 120), // Faded green
    color(180, 90, 60)    // Muted red
  ];
  
  // No stroke for static elements
  noStroke();
}

function draw() {
  // Add the background color to create the illusion of new static each frame
  fill(220, 180, 140, 20); // Semi-transparent background for trailing effect
  rect(0, 0, width, height);
  
  // Draw fast-moving static to simulate busy falling rain
  for (let i = 0; i < 500; i++) {
    let x = random(width);
    let y = random(height);
    let length = random(5, 20);
    let thickness = random(1, 3);
    
    fill(random(desertColors)); // Pick a random desert color for each line
    
    // Draw a vertical line (rain streak) for the static
    rect(x, y, thickness, length);
  }
  
  // Optionally add some smaller dots for more 'static' noise
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 5);
    
    fill(random(desertColors));
    ellipse(x, y, size, size);
  }
}

let angle = 0;
let zoom = 1;
let spiralSpeed = 0.05; // Speed of spiral rotation
let centerX, centerY;
let shiftSpeedX = 1; // Speed of center shifting horizontally
let shiftSpeedY = 1; // Speed of center shifting vertically

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); // White background
  
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background(255); // Clear background each frame
  
  // Move the spiral center around to simulate a moving drain
  centerX += shiftSpeedX;
  centerY += shiftSpeedY;
  
  // Reverse direction when the center hits canvas edges
  if (centerX < 0 || centerX > width) shiftSpeedX *= -1;
  if (centerY < 0 || centerY > height) shiftSpeedY *= -1;

  // Translate to the moving center and apply zoom/rotation
  translate(centerX, centerY);
  scale(zoom);
  rotate(angle);
  
  // Draw the spiral tunnel using black and white tiles
  drawSpiralTunnel(30, 40);
  
  // Increment angle for continuous rotation
  angle += spiralSpeed;
  
  // Gradually zoom in
  zoom *= 1.02;
  
  // Reset zoom after a certain level for looping effect
  if (zoom > 10) zoom = 1;
}

// Function to draw the black-and-white swirling tunnel
function drawSpiralTunnel(numSlices, sliceWidth) {
  let totalSlices = TWO_PI / numSlices; // Number of slices around the circle
  let radius = sliceWidth;

  for (let r = 0; r < width * 2; r += radius) {
    for (let i = 0; i < TWO_PI; i += totalSlices) {
      let colorIndex = (i / totalSlices) % 2;
      if (colorIndex == 0) fill(0); // Black tiles
      else fill(255); // White tiles

      // Draw triangular "tile" slices, creating the swirling tunnel illusion
      beginShape();
      vertex(0, 0); // Center of the spiral
      vertex(cos(i) * r, sin(i) * r); // Outer edge of the slice
      vertex(cos(i + totalSlices) * r, sin(i + totalSlices) * r); // Next outer edge
      endShape(CLOSE);
    }
  }
}

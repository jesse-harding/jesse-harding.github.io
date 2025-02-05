function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  fill(255,255,0);
  //the sun
  ellipse(width/2, height/2, 40,40);
  
  //translate origin to center of sun
  translate(width/2, height/2);
  //mercury
  push();
  fill(100);
  rotate(frameCount * PI/64);
  ellipse(40, 0, 10,10);
  pop();
  
  //venus
  push();
  fill(255,127,0);
  rotate(frameCount * PI/80);
  ellipse(60, 0, 20,20);
  pop();
  
  //earf
  push();
  fill(0,80,255);
  rotate(frameCount * PI/90);
  ellipse(120,0,30,30);
    translate(120,0);
    rotate(frameCount * PI/80);
    fill(200);
    ellipse(30, 0, 10,10);
  pop();
}
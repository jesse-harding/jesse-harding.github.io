let randX = 0;
let randY = 0;
let randColor;

function setup() {
  randColor = color(255,255,255);
  createCanvas(400, 400);
}

function draw() {
  translate(randX,randY);
  background(randColor);
  // background(map(mouseX, 0, width, 0, 255, 1));
  // beginShape();
  //   vertex(90,250);
  //   quadraticVertex(200,375,300,250);
  // endShape();
  
  // arc(width/2, 2 * width /3, 300, 200, 0, PI);
  // console.log(mouseX + ", " + mouseY);
  
  triangle(190, height/2, 210,height/2, 200, 220);
  line(200, 220, 200, 230);
  noFill();
  arc(200, 220, 40, 20, 0, PI);
  
}

function mousePressed(){
  // background(random(255), random(255), random(255));
  randX = random(-width/2, width/2);
  randY = random(-height/2, height/2);
}

function mouseMoved(){
  randColor = color(random(255), random(255), random(255));
}
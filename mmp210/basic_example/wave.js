//var r1 = 0;
//var r2 = 0;

let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function setup() {
//    stroke(0);
//    noFill();
//    rectMode(CENTER);
      w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
    var cnv = createCanvas(710, 400);
    //var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.parent('content'); //this puts my sketch in a div
    //cnv.position(width/2,0);
    
}

function draw() {
//    background(119,119,119);
//    translate(width/2, height/2);
//    beginShape();
//  for (var i = -4; i < width; i++){
//    curveVertex((width/2.0)*sin(i*2.0*PI/(width/mouseX)),(height/2.0)*sin(i*2.0*PI/(width/mouseY)));    
//  }
//  endShape(); 
  background(0);
  calcWave();
  renderWave();
}
function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
  }
}
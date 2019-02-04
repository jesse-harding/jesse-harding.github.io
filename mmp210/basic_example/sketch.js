var r1 = 0;
var r2 = 0;

function setup() {
    stroke(0);
    noFill();
    rectMode(CENTER);
    var cnv = createCanvas(800, 400);
    //var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.parent('content');
//    cnv.position(-width/2,0);
    
}

function draw() {
    background(119,119,119);
    translate(width/2, height/2);
    beginShape();
  for (var i = -4; i < width; i++){
    curveVertex((width/2.0)*sin(i*2.0*PI/(width/mouseX)),(height/2.0)*sin(i*2.0*PI/(width/mouseY)));    
  }
  endShape(); 
}

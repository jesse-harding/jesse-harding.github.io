let r = [];
let g = [];
let b = [];
let wiggleX;
let wiggleY;

function setup() {
  var cnv = createCanvas(512,512);
    cnv.style('display', 'block');
    cnv.parent('content'); //this puts my sketch in a div
}

function draw() {

  for (let i = 0; i < height; i++) {
    wiggleX = random(mouseX);
    wiggleY = random(mouseY);
    if (r.length > 0){
      fill(r[i],g[i], b[i]);
    }
    strokeWeight(1);
    ellipse(wiggleX + r[i]*2, wiggleY+ g[i]*2, b[i]*2);
  }
}

function mousePressed(){
  for (let i = 0; i < height; i++) {
    r[i] = random(255);
    g[i] = random(255);
    b[i] = random(255);
  }
}
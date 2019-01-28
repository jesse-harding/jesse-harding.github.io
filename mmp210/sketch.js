var r1 = 0;
var r2 = 0;

function setup() {
    noStroke();
    rectMode(CENTER);
    var cnv = createCanvas(200, 200);
    //var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.parent('content');
    cnv.position(-width/2,0);
}

function draw() {
    background(119,119,119);
    if (mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < height && mouseIsPressed){
    r1 = map(mouseX, 0, width, 0, height);
    
}
r2 = height - r1;
  
    fill(237,34,93,r1);
    rect(width/2 + r1/2, height/2, r1, r1);
  
    fill(237,34,93,r2);
    rect(width/2 - r2/2, height/2, r2, r2);
}

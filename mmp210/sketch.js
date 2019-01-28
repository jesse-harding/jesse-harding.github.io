function setup() {
  //createCanvas(720, 400);
  noStroke();
  rectMode(CENTER);
    var cnv = createCanvas(200, 200);
  //var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cnv.parent('content');
  cnv.position(100,100);
}

function draw() {
  background(230);

  var r1 = map(mouseX, 0, width, 0, height);
  var r2 = height - r1;
  
  fill(237,34,93,r1);
  rect(width/2 + r1/2, height/2, r1, r1);
  
  fill(237,34,93,r2);
  rect(width/2 - r2/2, height/2, r2, r2);
}

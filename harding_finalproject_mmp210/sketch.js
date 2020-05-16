function setup() {
    var canvas = createCanvas(750, 500);
    canvas.parent('sketch-holder');
}

function draw() {
    background(199,221,255); //an RGB color for the canvas' background (dark blue)
    noStroke();
    fill(255,255,127,200); //white, semi-transparent
    ellipse(mouseX+50,mouseY+50,10,10); // follows the mouse, 10px dia
}
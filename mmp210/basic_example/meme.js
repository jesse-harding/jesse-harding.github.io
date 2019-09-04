let img;
let radius1 = 10;
let radius2 = 100;
let radius3 = 20;

function setup() {

    var cnv = createCanvas(windowWidth/2, windowHeight/2);
    cnv.style('display', 'block');
    cnv.parent('content'); //this puts my sketch in a div
}

function draw() {
    
    
    stroke(0);
    translate(width/2, height/2);
       background(0);
        beginShape();
 
        endShape(CLOSE);

    console.log("X: " + mouseX);
    console.log("Y: " + mouseY);
}

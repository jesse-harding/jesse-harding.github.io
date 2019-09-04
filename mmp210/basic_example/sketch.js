let img;

function setup() {

    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.parent('content'); //this puts my sketch in a div
//    img = loadImage('space.jpg'); 
}

function draw() {
    background(119,119,119);
    
    noStroke();
    
//    image(img,0,0,width, height);
    
    
    fill(255);
    push();
    translate(300,300);
    ellipse(0,0,15,10);
    pop();
    
    push();
    translate(100,100);
    stroke(245,180,130);
    strokeWeight(3);
    fill(128);
    beginShape();
    vertex(5,16);
    vertex(5,14);
    vertex(7,14);
    vertex(7,12);
    endShape();
    pop();

    push();
    translate(width/2, height/2);
    if (mouseY > height/2){
    rect(-15,30,30,map(mouseY, height/2, height, 5, 25));
    }
    else{
    rect(-15,30,30,5);
    }
    pop();
    console.log("X: " + mouseX);
    console.log("Y: " + mouseY);
}

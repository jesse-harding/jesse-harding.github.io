let img;

function setup() {

    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.parent('content'); //this puts my sketch in a div
    img = loadImage('space.jpg'); 
}

function draw() {
    //background(119,119,119);
    noStroke();
    image(img,0,0,width, height);
    translate(width/2, height/2);
    fill(255,200,160);
    ellipse(0,0,100,140); //face
    fill(128,128,128);
    ellipse(0,-30, 70, 140);
    ellipse(0,-17,100,100);
    fill(255,200,160);
    ellipse(0,0,100,80); //face
    
    fill(255); //whites of eyes
    push();
    translate(-20,-15);
    ellipse(0,0,15,10);
    fill(0);
    //ellipse(0,0,8,8); //pupil
    ellipse(map(mouseX, 0, width, -4, 4),0,8,8); //pupil
    noFill();
    stroke(255,255,255,128);
    ellipse(0,0, 30, 20);
    pop();
    push();
    translate(20,-15);
    ellipse(0,0,15,10); //sclera
    fill(0);
    //ellipse(0,0,8,8); //pupil
    ellipse(map(mouseX, 0, width, -4, 4),0,8,8); //pupil
    noFill();
    stroke(255,255,255,128);
    ellipse(0,0, 30, 20);
    beginShape();
    vertex(-25, 0);
    vertex(-15, 0);
    endShape();
    pop();
    beginShape();
    endShape();

    stroke(245,180,130);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(-7,12);
    vertex(-7,14);
    vertex(-5,14);
    vertex(-5,16);
    vertex(5,16);
    vertex(5,14);
    vertex(7,14);
    vertex(7,12);
    endShape();
    
    noStroke();
    fill(0);
    if (mouseY > height/2){
    rect(-15,30,30,map(mouseY, height/2, height, 5, 25));
    }
    else{
    rect(-15,30,30,5);
    }
    stroke(245,100,100);
    strokeWeight(3);
    beginShape();
    vertex(-15,30);
    vertex(15,30);
    endShape();
    beginShape();
    if (mouseY > height/2){
    vertex(-15,35+map(mouseY, height/2, height, 0, 20));
    vertex(15,35+map(mouseY, height/2, height, 0, 20));    }
    else{
    vertex(-15,35);
    vertex(15,35);
    }
    endShape();
    
    
//    fill(255,255,20);
//    ellipse(100,100,100,100)

    console.log("X: " + mouseX);
    console.log("Y: " + mouseY);
}

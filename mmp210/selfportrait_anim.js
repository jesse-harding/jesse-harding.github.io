let img;
let r = 0;
let g = 0;
let b = 0;
let rState = true;
let gState = true;
let bState = true;

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
    
    //animate color change
    push();
    if (r > 255 || r < 0){
        rState = !rState;
        //r = 0;
    }
    if (g > 255 || g < 0){
        gState = !gState;
//        g = 0;
    }
    if (b > 255 || b < 0){
        bState = !bState;
//        b = 0;
    }
    fill(r,g,b);
    ellipse(10,10,100,100);
    if (frameCount % 2 == 0){
        if (rState){
            r++;
    }
        else{
            r--;
    }
    }
    if (frameCount % 3 == 0){
        if (gState){
            g++;
    }
        else{
            g--;
    }
    }
    if (!bState){
        b++;
    }
    else{
        b--;
    }
//    r++;
//    g++;
//    b++;
    
    pop();
    
    
    push();
    translate(width/2, height/2); //move origin to center
    
    //rotate face in place well
    rotate(frameCount*PI/60);
//    rotate(3 * PI / 2);
    //rotate face poorly
//    rotate(frameCount * PI/frameRate());
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
    //ellipse(0,0,8,8);
    //pupil
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
    pop();
    
    
//    fill(255,255,20);
//    ellipse(100,100,100,100)

      console.log(frameRate());
//    console.log("X: " + mouseX);
//    console.log("Y: " + mouseY);
}

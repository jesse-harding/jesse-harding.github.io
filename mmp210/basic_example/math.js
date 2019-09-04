let img;
let radius1 = 10;
let radius2 = 100;
let radius3 = 20;

function setup() {

    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.parent('content'); //this puts my sketch in a div
}

function draw() {
    
    
    stroke(0);
    translate(width/2, height/2);
//    if (frameCount % 4 == 0){
//        background(255);
//        beginShape();
//        for (let a = 0; a < 4 * PI; a += PI / 40){
//            let cx = cos(a) * radius2;
//            let sy = sin(a) * radius2;
//            cx += random(-5,5); //random example
//            sy += random(-5,5); //random example
//            vertex(cx, sy);
//        }
//        endShape(CLOSE);
//    }
    
    
        background(255);
        beginShape();
        for (let a = 0; a < 2 * PI; a += PI / 100){
            let cx = cos(a) * radius2;
            let sy = sin(a) * radius2;
//                let cx2 = cos(a*10) * radius1;
//                let sy2 = sin(a*10) * radius1;
//                let cx3 = -cos(a*9) * radius3;
//                let sy3 = sin(a*9) * radius3;
                let cx2 = cos(a*mouseX) * radius1;
                let sy2 = sin(a*mouseX) * radius1;
                let cx3 = -cos(a*mouseY) * radius3;
                let sy3 = -sin(a*mouseY) * radius3;

            vertex(cx + cx2 + cx3, sy + sy2 + sy3);
        }
        endShape(CLOSE);

    console.log("X: " + mouseX);
    console.log("Y: " + mouseY);
}

let nav = [];
let pos = [];
let numNav = 18;
let radius;
let currentRotation = 0;
let sel = false;
let active = 0;
let activePos = 0;
let time = 0;
let activeDiam;
let inactiveDiam;
let rotSpeed = 50; //higher num is slower

function setup() {
  createCanvas(200, 200);
    //   var cnv = createCanvas(400, 400);
    // cnv.parent('content'); //canvas in a div with id "content"
  activeDiam = (PI * width / (2.2*numNav));
  inactiveDiam = 0.7 * activeDiam;
  radius = width/2 - activeDiam - 2
  
  noStroke();
  
  for (let i = 0; i < numNav; i++){
    nav[i] = new Bead();
    pos[i] = [];
    pos[i][0] = radius * cos( i * TWO_PI / numNav  - PI/2);
    pos[i][1] = radius * sin( i * TWO_PI / numNav  - PI/2);
  }
}

function draw() {
  background(255);

  translate(width/2, height/2);
  
  push();
    strokeWeight(width*.03);
    noFill();
    stroke(0);
    ellipse(0,0,radius*2);
  pop();
  
  rotateNav();
  
  for (let i = 0; i < numNav; i++){
    nav[i].x = radius * cos( i * TWO_PI / numNav - PI/2);
    nav[i].y = radius * sin( i * TWO_PI / numNav - PI/2);
  }
  
  for (let i = 0; i < numNav; i++){
    if (nav[i].active){
      nav[i].c = color(0);
      nav[i].r = activeDiam;
    }
    else{
      nav[i].c = color(0);
      nav[i].r = inactiveDiam;
    } 
    nav[i].display();
  }
}

class Bead {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.c = color(255);
    this.r = inactiveDiam;
    this.active = false;
  }
  display(){
    fill(this.c);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function mouseReleased(){
  for (let i = 0; i < numNav; i++){
    if (dist(mouseX - width/2, mouseY - height/2, pos[i][0], pos[i][1]) < inactiveDiam){
      nav[i].active = true;
      activePos = i;
      currentRotation += i;
      active = currentRotation % numNav;
      selection(active);
      time = frameCount;
    }
    else{
      nav[i].active = false;
    }
  }
}

function rotateNav(){
  if((frameCount-time) * PI /rotSpeed < activePos * TWO_PI / numNav){
    rotate(-(frameCount-time) * PI /rotSpeed);
    sel = true;
  }
  else{
    rotate(-activePos * TWO_PI / numNav);
    if (sel){
      // selection(active);
      sel = false;
    }
  }
}

function selection(index){
  console.log(index);
}

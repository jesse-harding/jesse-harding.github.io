let table;
let mode = 0;
let translationX = 50;
let translationY = -10;

let properties = [];

let trend1 = [];
let trend2 = [];
let trend3 = [];
let trend4 = [];

let vacMaxAcreage = 10;
let vacMaxValue = 100000;
let resMaxAcreage = 30;
let resMaxValue = 450000;
let vac2MaxAcreage = 60;
let vac2MaxValue = 100000;

function preload() {
  table = loadTable("assessmentData.csv", "csv");
}

function setup() {
  createCanvas(windowHeight+100, windowHeight-20);
  rectMode(CENTER);

  for (let r = 1; r < table.getRowCount(); r++) {
    if (table.getString(r, 1) != "null") {
      properties[properties.length] = new Property(
        table.getString(r, 0),
        table.getString(r, 1),
        float(table.getString(r, 2)),
        int(table.getString(r, 3).replace(",", ""))
      );
    }
  }
  for (let i = 0; i < properties.length; i++) {
    // if (properties[i].id == "419.-1-20") {
    //   properties[i].value = 60000;
    // }
    // if (properties[i].id == "419.-1-21.13") {
    //   properties[i].value = 30000;
    // }
      if (properties[i].id == "419.-1-21.3") { //property size wrong in assessement roll
      properties[i].size = 10.16;
    }
    
    if (properties[i].type == "314 Rural vac<10") {
      properties[i].fill = color(255, 0, 0);
      properties[i].x = map(properties[i].size, 0, vacMaxAcreage, 0, width-100);
      properties[i].y =
        height - map(properties[i].value, 0, vacMaxValue, 0, height);
    }
    if (properties[i].type == "260 Seasonal res - WTRFNT") {
      properties[i].fill = color(0, 127, 0);
      properties[i].x = map(properties[i].size, 0, resMaxAcreage, 0, width-100);
      properties[i].y =
        height - map(properties[i].value, 0, resMaxValue, 0, height);
    }
    if (properties[i].type == "260 Seasonal res") {
      properties[i].fill = color(0, 255, 0);
      properties[i].x = map(properties[i].size, 0, resMaxAcreage, 0, width-100);
      properties[i].y =
        height - map(properties[i].value, 0, resMaxValue, 0, height);
    }
    if (properties[i].type == "323 Vacant rural") {
      properties[i].fill = color(0, 0, 255);
      properties[i].x = map(properties[i].size, 0, vac2MaxAcreage, 0, width-100);
      properties[i].y =
        height - map(properties[i].value, 0, vac2MaxValue, 0, height);
    }
  }

  for (let i = 0; i < properties.length; i++) {
    if (properties[i].type == "314 Rural vac<10") {
          trend1[trend1.length] = createVector(properties[i].x, properties[i].y);
        }
      
    if (properties[i].type == "260 Seasonal res - WTRFNT" || properties[i].type == "260 Seasonal res") {
          trend2[trend2.length] = createVector(properties[i].x, properties[i].y);
        }
    if (properties[i].type == "260 Seasonal res") {
          trend3[trend3.length] = createVector(properties[i].x, properties[i].y);

    }
    if (properties[i].type == "323 Vacant rural") {
          trend4[trend4.length] = createVector(properties[i].x, properties[i].y);
    }
  }
}

function draw() {
  translate(translationX, translationY);
  noStroke();
  background(255);

  if (mode == 0) {
    push();
    fill(0);
    translate(0, -translationY);
    for (let x = 0; x < 10; x++) {
      text((x * vacMaxAcreage) / 10, (x * width-100) / 10, height);
    }
    pop();
    push();
    fill(0);
    translate(-50, 0);
    for (let y = 1; y < 20; y++) {
      text("$" + (y * vacMaxValue) / 20, 0, height - (y * height) / 20);
    }
    text("314 Rural vac<10", width-100 - 105, 20);
    pop();

    push();
    noFill();
    stroke(0);
    strokeWeight(2);
    linearRegression(trend1);
    pop();
    
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].type == "314 Rural vac<10") {
        properties[i].plot();
      }
    }

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].type == "314 Rural vac<10") {
        properties[i].ours();
        properties[i].label();
      }
    }


    console.log(map(mouseY-translationY, 0, height, vacMaxValue, 0));
  }

  if (mode == 1) {
    push();
    fill(0);
    translate(0, -translationY);
    for (let x = 0; x < 10; x++) {
      text((x * resMaxAcreage) / 10, (x * width-100) / 10, height);
    }
    pop();
    push();
    noFill();
    stroke(0);
    strokeWeight(2);
linearRegression(trend2);
    pop();
    push();
    fill(0);
    translate(-50, 0);
    for (let y = 1; y < 20; y++) {
      text("$" + (y * resMaxValue) / 20, 0, height - (y * height) / 20);
    }
    text("260 Seasonal res (incl. WTRFNT)", width-100 - 190, 20);
    pop();

    for (let i = 0; i < properties.length; i++) {
      if (
        properties[i].type == "260 Seasonal res - WTRFNT" ||
        properties[i].type == "260 Seasonal res"
      ) {
        properties[i].plot();
      }
    }
    for (let i = 0; i < properties.length; i++) {
      if (
        properties[i].type == "260 Seasonal res - WTRFNT" ||
        properties[i].type == "260 Seasonal res"
      ) {
        properties[i].ours();
        properties[i].label();
      }
    }
    
    
    console.log(map(mouseY-translationY, 0, height, resMaxValue, 0));
  }

  if (mode == 2) {
    push();
    fill(0);
    translate(0, -translationY);
    for (let x = 0; x < 10; x++) {
      text((x * resMaxAcreage) / 10, (x * width-100) / 10, height);
    }
    pop();
    push();
    noFill();
    stroke(0);
    strokeWeight(2);
linearRegression(trend3);
    pop();
    push();
    fill(0);
    translate(-50, 0);
    for (let y = 1; y < 20; y++) {
      text("$" + (y * resMaxValue) / 20, 0, height - (y * height) / 20);
    }
    text("260 Seasonal res", width-100 - 105, 20);
    pop();

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].type == "260 Seasonal res") {
        properties[i].plot();
      }
    }
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].type == "260 Seasonal res") {
        properties[i].ours();
        properties[i].label();
      }
    }

    console.log(map(mouseY-translationY, 0, height, resMaxValue, 0));
  }

  if (mode == 3) {
    push();
    fill(0);
    translate(0, -translationY);
    for (let x = 0; x < 10; x++) {
      text((x * vac2MaxAcreage) / 10, (x * width-100) / 10, height);
    }
    pop();
    push();
    noFill();
    stroke(0);
    
    console.log(map(mouseY - translationY, 0, height, vac2MaxValue, 0));
    strokeWeight(2);
linearRegression(trend4);
    
    pop();
    push();
    fill(0);
    translate(-50, 0);
    for (let y = 1; y < 20; y++) {
      text("$" + (y * vac2MaxValue) / 20, 0, height - (y * height) / 20);
    }
    text("323 Vacant rural", width-100 - 105, 20);
    pop();

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].type == "323 Vacant rural") {
        properties[i].plot();
      }
    }
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].type == "323 Vacant rural") {
        properties[i].ours();
        properties[i].label();
      }
    }
    
    
    
    // line(0, mouseY-translationY, width-100, mouseY-translationY);
  }
  
  stroke(0);
  line(0, mouseY-translationY, width-100, mouseY-translationY);
  line(mouseX - translationX, 0, mouseX - translationX, height);
}

function keyPressed() {
  if (mode < 3) {
    mode++;
  } else {
    mode = 0;
  }
}

class Property {
  constructor(id, type, size, value) {
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.value = value;
    this.type = trim(type);
    this.id = trim(id);
    this.d = 5;
    this.fill = color(0);
  }

  plot() {
    fill(this.fill);
    if (
      this.id == "419.-1-20" ||
      this.id == "419.-1-21.121" ||
      this.id == "419.-1-21.122" ||
      this.id == "419.-1-21.13" ||
      this.id == "419.-1-21.3"
    ) {
      return;
    } else {
      ellipse(this.x, this.y, this.d);
    }
  }
  ours() {
    if (
      this.id == "419.-1-20" ||
      this.id == "419.-1-21.121" ||
      this.id == "419.-1-21.122" ||
      this.id == "419.-1-21.13" ||
      this.id == "419.-1-21.3"
    ) {
      push();
      stroke(0);
      translate(this.x, this.y);
//       rotate((frameCount * PI) / 100);
      rotate(PI/4);
      fill(this.fill);
      rect(0, 0, this.d * 1.5);
      pop();
    }
  }
  label() {
    if (
      dist(mouseX - translationX, mouseY - translationY, this.x, this.y) <
      this.d / 2
    ) {
      push();
      fill(0);
      text(this.id, mouseX - translationX + 10, mouseY - translationY - 10);
      text("value: $" + this.value, width-300, 50);
      text("acreage: " + this.size, width-300, 70);
      pop();
      
      if(mouseIsPressed){
        this.fill = color(0,0,0);
        navigator.clipboard.writeText(this.id);
        
      }
    }
  }
}


function linearRegression(input){
  
  //least squares method
  
  let xsum = 0;
  let ysum = 0;
  let data = [];
  
  
  for( let i=0; i<input.length; i++){
    data[data.length] = createVector(map(input[i].x, 0, width-100, 0,1), map(input[i].y, 0, height, 1,0))
    // data[i].x = map(input[i].x, 0, width-100, 0,1);
    // data[i].y = map(input[i].y, 0, height, 0,1);
    xsum += data[i].x;
    ysum += data[i].y;
  }
  
  let xmean = xsum/data.length;
  let ymean = ysum/data.length;
  
  let num = 0;
  let den = 0;
  
  for(let i = 0; i<data.length; i++){
    let x = data[i].x;
    let y = data[i].y;
    num += (x-xmean) * (y-ymean);
    den += (x-xmean) * (x-xmean);
  }
  
  m = num/den;
  b = ymean-m*xmean;
  
    let x1 = 0;
 let y1 = m * x1 + b;
  let x2 = 1;
  let y2 = m* x2 + b;
  
  
  let x1a = map(x1, 0, 1,0, width-100);
  let y1a = map(y1, 0, 1, height, 0);
  let x2a = map(x2, 0, 1,0, width-100);
  let y2a = map(y2, 0, 1, height, 0);
  
  stroke(255, 0, 255);
  line(x1a, y1a, x2a, y2a);
}

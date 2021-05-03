function setup() {
  createCanvas(400, 400); //define our canvas drawing area
  noStroke(); //set stroke color to transparent
}

function draw() {
  background(250,100,10); //draw orange background
  
  fill(0); //set fill color to black
  
  //use system variables of width and height to position elements
  arc(width/2, 2 * height / 3, 300, 150, 0, PI); //mouth
  
  fill(250,100,10); // set the fill color to orange
  
  push(); //save current settings
  translate(-100,0); //move everything left
  triangle(width/2 - 10,265, width/2 + 10, 265, width/2, 285);//tooth
  pop(); //revert settings back to at the point of the most recent push();
  
  
  push();//save current settings
  translate(100,0);//move everything right
  triangle(width/2 - 10,265, width/2 + 10, 265, width/2, 285); //tooth
  pop(); //revert settings back to at the point of the most recent push();
  
  fill(0); //set fill color to black
  push();
  translate(-100,0);
  ellipse(width/2, 120, 75, 75);
  pop();
    push();
  translate(100,0);
  ellipse(width/2, 120, 75, 75);
  pop();
  
  
  //create a local variable using the map function
  //change value between -20 and 20 based on mouse x-axis position
  let mouseEye = map(mouseX, 0, width, -20, 20, 1);
  
  fill(250,100,10); //set fill to orange again
  push();
  translate(-100 + mouseEye,0); //change translation amount based on mouse
  ellipse(width/2, 120, 40, 40);
  pop();
    push();
  translate(100 + mouseEye,0);
  ellipse(width/2, 120, 40, 40);
  pop();
  
  //output mouse location on console
  console.log(mouseX + "," + mouseY);
}
//define initial position and size of clickable area for object
let shapeX = 100;
let shapeY = 200;
let shapeW = 110;
let shapeH = 140;

//boolean variable to store whether the object has been clicked on
let clicked = false;

//variables to hold the mouse position when you click relative to the top left corner of the clickable area
let diffX;
let diffY;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  //draw rectangle to represent clickable area
  rect(shapeX, shapeY, shapeW, shapeH);

  //mouseIsPressed is a boolean system variable that is true as long as the mousebutton is pressed
  if (mouseIsPressed){
    
    //this condition is satisfied if either the object has already been clicked, or if a new click falls inside of the clickable area 
    if (clicked || mouseX > shapeX && mouseX < shapeX + shapeW && mouseY > shapeY && mouseY < shapeY + shapeH){
      if (!clicked){
        //store the location of the mouse relative to the top left corner of the clickable area
        diffX = mouseX - shapeX;
        diffY = mouseY - shapeY;
        clicked = true; //change boolean variable to show that the object is currently clicked
      } 
      shapeX = mouseX - diffX; //update the clickable area as you drag the object
      shapeY = mouseY - diffY;
    }
  }
  else{ //when the mousebutton is released, reset our boolean variable to get ready for the next click
    clicked = false;
  }
}
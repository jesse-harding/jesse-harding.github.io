//click bottom color bar to switch camera feeds
//click and drag to draw ellipses on screen
//press cmd while dragging to change color of stroke
//press shift and drag to draw a continuous line
//press escape to clear all annotation
//type to make a note to the right of your most recent annotation (backspace will remove text from that note)

var capture = []; //array to hold capture (camera) objects

var w = 640,
    h = 480;

let ids = []; //array to hold capture ids

let camNum = 0; //variable to select active camera

let comments = []; //array to hold information on annotations on screen

let active = 0; //most recent annotation is editable

let currentColor; //store most recently selected color to be used in subsequent annotations

function setup() {
    colorMode(HSB);

    currentColor = color(0,255,255);
    
    //check if cameras are accessible
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
    }

    //List cameras and microphones and add device ids to ids array if they are video
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        devices.forEach(function(device) {
            if (device.kind == "videoinput"){
                ids.push(device.deviceId);
            }
        });
  
        for (let i = 0; i < ids.length; i++){ //add capture objects to our array using only video
            capture[i] = createCapture({
                audio: false,
                video: {
                    deviceId: ids[i],
                    width: w,
                    height: h
                }
            });
            capture[i].hide(); //hide all automatically displayed feeds
        }
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
    
    createCanvas(640, h+20); //make room for camera selection bar
}

function draw() {
    fill(0);
 
    if (capture[ids.length-1]){
        image(capture[camNum], 0, 0, w, h); //if there are cameras available, draw one feed to the canvas
    }
    push();
    noStroke();
    for(let i = 0; i < ids.length; i++){    //draw camera selection bar at bottom of screen
        fill(i*255/(ids.length-1),255,255);
        rect(i*width/ids.length,h,width/3,20);
    }
    pop();
    
    for(let i=0; i < comments.length; i++){ //show all annotations
        comments[i].show();
        if (comments.length > 1 && i > 0 && comments[i].line && comments[i-1].line){ //draw lines between points in line mode
            stroke(comments[i].color);
            strokeWeight(3);
            line(comments[i].x, comments[i].y,comments[i-1].x,comments[i-1].y)
        }
    }
}

function keyTyped() {
    comments[active].text += key; //add text input to each annotation object
}

function keyPressed() {
    if (comments.length > 0){
        active = comments.length - 1; //determine which comment/annotation is active
    }
    else{
        active = 0;
    }
    
    if (keyCode == 8 && comments[active].text.length > 0){
        comments[active].text = comments[active].text.substr(0, comments[active].text.length-1); //remove chars from comment string when backspace is pressed
    }

    //clear all comments when esc key is pressed
    if (keyCode == 27){
        for (let i = 0; i < comments.length; i++){
            comments.splice(0, comments.length);
        }
    }
}

function mousePressed(){
    if (mouseY > h && mouseY < h + 20){
        camNum = constrain(int(ids.length*mouseX/width), 0, ids.length); //select camera feed
    }
    else{
        comments[comments.length] = new Comment(mouseX, mouseY, currentColor); //make annotation
        if (comments.length > 0){
            active = comments.length - 1;
        }
        else{
            active = 0;
        }
    }
}

function mouseDragged(){

    if (keyIsPressed && keyCode == 91){ //select color if cmd is pressed
        comments[active].color = color(map(mouseX-comments[active].x,-comments[active].w/2,comments[active].w/2,255,0,1),map(mouseY-comments[active].y,-comments[active].h/2,comments[active].h/2,0,255,1),map(mouseY-comments[active].y,-comments[active].h/2,comments[active].h/2,0,255,1));
        currentColor = comments[active].color;
    }
    else if(keyIsPressed && keyCode == 16){ //shift enables line drawing mode
        comments[active].line = true;
        comments[active].w = 0;
        comments[active].h = 0;
        comments[comments.length] = new Comment(mouseX, mouseY, currentColor);
        if (comments.length > 0){
            active = comments.length - 1;
        }
    }
    else{
        comments[active].w = 2*(mouseX-comments[active].x); //set ellipse widths
        comments[active].h = 2*(mouseY-comments[active].y);
    }
}

class Comment{ //custom class for our comment objects
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
        this.text = "";
        this.color = color;
        this.line = false;
    }
    show(){
        if (!this.line){ //only draw ellipses not in line drawing mode
            push();
            noFill();
            strokeWeight(3);
            stroke(this.color);
            ellipse(this.x, this.y,this.w,this.h);
            noStroke();
            textSize(20);
            fill(this.color);
            text(this.text, 10 + this.x+this.w/2, this.y + 5);
            pop();
        }
    }
}

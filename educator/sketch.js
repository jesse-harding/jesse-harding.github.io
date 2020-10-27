var capture = [];

var w = 640,
    h = 480;

let ids = [];

let camNum = 2;

let comments = [];

let active = 0;

let currentColor;

function setup() {
    colorMode(HSB);

    currentColor = color(0,255,255);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
    }

    //List cameras and microphones.
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        devices.forEach(function(device) {
            if (device.kind == "videoinput"){
                ids.push(device.deviceId);
            }
        });
  
        for (let i = 0; i < ids.length; i++){
            capture[i] = createCapture({
                audio: false,
                video: {
                    deviceId: ids[i],
                    width: w,
                    height: h
                }
            });
            capture[i].hide();
        }
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
    
    createCanvas(640, h+20);
}

function draw() {
    fill(0);
 
    if (capture[ids.length-1]){
        image(capture[camNum], 0, 0, w, h);
    }
    push();
    noStroke();
    for(let i = 0; i < ids.length; i++){
        fill(i*255/(ids.length-1),255,255);
        rect(i*width/ids.length,h,width/3,20);
    }
    pop();
    
    for(let i=0; i < comments.length; i++){
        comments[i].show();
        if (comments.length > 1 && i > 0 && comments[i].line && comments[i-1].line){
            stroke(comments[i].color);
            strokeWeight(3);
            line(comments[i].x, comments[i].y,comments[i-1].x,comments[i-1].y)
        }
    }
}

function keyTyped() {
    comments[active].text += key;
}

function keyPressed() {
    if (comments.length > 0){
        active = comments.length - 1;
    }
    else{
        active = 0;
    }
    
    if (keyCode == 8 && comments[active].text.length > 0){
        comments[active].text = comments[active].text.substr(0, tcomments[active].text.length-1);
    }
    if (comments.length > 0 && comments[active].text.length > 0){
        console.log(comments[active].text);
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
        camNum = constrain(int(ids.length*mouseX/width), 0, ids.length);
    }
    else{
        comments[comments.length] = new Comment(mouseX, mouseY, currentColor);
        if (comments.length > 0){
            active = comments.length - 1;
        }
        else{
            active = 0;
        }
    }
}

function mouseDragged(){

    if (keyIsPressed && keyCode == 91){
        comments[active].color = color(map(mouseX-comments[active].x,-comments[active].w/2,comments[active].w/2,255,0,1),map(mouseY-comments[active].y,-comments[active].h/2,comments[active].h/2,0,255,1),map(mouseY-comments[active].y,-comments[active].h/2,comments[active].h/2,0,255,1));
        currentColor = comments[active].color;
    }
    else if(keyIsPressed && keyCode == 16){
        comments[active].line = true;
        comments[active].w = 0;
        comments[active].h = 0;
        comments[comments.length] = new Comment(mouseX, mouseY, currentColor);
        if (comments.length > 0){
            active = comments.length - 1;
        }
    }
    else{
        comments[active].w = 2*(mouseX-comments[active].x);
        comments[active].h = 2*(mouseY-comments[active].y);
    }
}

class Comment{
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
        if (!this.line){
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
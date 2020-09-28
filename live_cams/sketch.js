var capture = [];
var w = 640,
    h = 480;
let ids = [];

let camNum = 0;

let typedChars = "";

function setup() {
  fill(0);
  rectMode(CENTER);
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
  return;
}

// List cameras and microphones.

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

  createCanvas(displayWidth, displayHeight);
}

function draw() {
  background(255);
  fill(0);
  
     // text(typedChars,0, 10);
  if (capture[ids.length-1]){
    image(capture[camNum], width/2-capture[camNum].width/2, height/2- capture[camNum].height/2, capture[camNum].width, capture[camNum].height);
  }
 
}

function keyPressed(){
  if (int(key) <= ids.length){
    camNum = key - 1;
  }
  else if (key != "Backspace"){
    typedChars = typedChars + key;
  }
  else if (typedChars.length > 0){
    typedChars = typedChars.substr(0, typedChars.length-1);
  }
  if (typedChars.length > 0){

    console.log(typedChars);
  }
} 

function mousePressed() {
    let fs = fullscreen();
    if(!fs){
    fullscreen(!fs);
    }  
}
  

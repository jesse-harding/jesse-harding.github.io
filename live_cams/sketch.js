var capture = [];
var w = 640,
    h = 480;
let ids = [];

let camNum = 0;

function setup() {
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
  if (capture[ids.length-1]){
    image(capture[camNum], width/2-capture[camNum].width/2, height/2- capture[camNum].height/2, capture[camNum].width, capture[camNum].height);
  }
}

function keyPressed(){
  if (int(key) <= ids.length){
    camNum = key - 1;
  }
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

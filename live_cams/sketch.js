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

  createCanvas(w, h);
}

function draw() {
  if (capture[ids.length-1]){
    // for (let i = 0; i < capture.length; i++){
      // image(capture[i], i*w/ids.length, 0, w/ids.length, h/ids.length);
    image(capture[camNum], 0, 0, width, height);
    // }
  }
}

function keyPressed(){
  if (int(key) <= ids.length){
    camNum = key -1;
  }
}
  
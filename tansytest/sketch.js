//media playback reference: https://p5js.org/reference/#/p5.MediaElement
//modified from video example from p5js.org by Jesse Harding

//declare a boolean variable to store whether or not the video is playing
let playing = false;
let video1 = false;
let video2 = false;
let video3 = false;

//create a variables to hold your video object (this could be streamlined as an array for a case with many videos)
let bgVideo;
let videoAsset;
let videoAsset2;
let videoAsset3;

function preload(){
  //load video files
  bgVideo = createVideo('fingers.mov');
  videoAsset = createVideo('fingers.mov');
  videoAsset2 = createVideo('fingers.mov');
  videoAsset3 = createVideo('fingers.mov');
}

function setup() {
  //create your canvas
  createCanvas(640,480);
  
  //createVideo() automatically puts the video file in the window, so we have to hide it initially
  videoAsset.hide();
  videoAsset2.hide();
  videoAsset3.hide();
  bgVideo.hide();
  videoAsset.play();
  videoAsset2.play();
  videoAsset3.play();
  bgVideo.loop();
  bgVideo.volume(0);
}

function draw(){
  if (abs(videoAsset.duration()-videoAsset.time()) < .05){
    video1 = false;
  }
  if (abs(videoAsset2.duration()-videoAsset2.time()) < .05){
    video2 = false;
  }
  if (abs(videoAsset3.duration()-videoAsset3.time()) < .05){
    video3 = false;
  }
  // console.log(abs(videoAsset.duration()-videoAsset.time()));
  //check video playhead times and our playing boolean to initially pause
  if (videoAsset.time() > 0 && videoAsset2.time() > 0 && videoAsset3.time() > 0 && bgVideo.time() > 0 && !playing){ 
    videoAsset.pause();
    videoAsset2.pause();
    videoAsset3.pause();
    playing = true;
  }
  
  //draw video into canvas
  image(bgVideo, 0, 0, width, height);
  if(video1){
    image(videoAsset, 0, 0, width/3, height/3);
    }
  if(video2){
    image(videoAsset2, width/3, 0, width/3, height/3);
  }
  if(video3){
    image(videoAsset3, width/3*2, 0, width/3, height/3);
  }
}

//if the mouse button is pressed on either side of the canvas, play the corresponding video 
function keyTyped() {
  if (key === 'a') {
    videoAsset.play();
    video1 = true;
  }
  if (key === 's') {
    videoAsset2.play();
    video2 = true;
  }
  if (key === 'd') {
    videoAsset3.play();
    video3 = true;
  }
}

//when the mouse is released, pause playback

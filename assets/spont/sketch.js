let soundFile1;
let bgImg;

function preload() {
  // soundFormats('mp3', 'ogg');
  soundFile1 = loadSound('1.m4a');
  soundFile2 = loadSound('2.m4a');
  soundFile3 = loadSound('3.m4a');
  bgImg = loadImage('spont.png')
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background(255);
  image(bgImg, 0, 0, width, height);
}

function mousePressed() {
  if (dist(mouseX, mouseY, 135, 150) < 30 && !soundFile1.isPlaying()) {
    soundFile1.play();
    console.log("1");
  }
  if (dist(mouseX, mouseY, 200, 150) < 30 && !soundFile2.isPlaying()) {
    soundFile2.play();
    console.log("2");
  }
  if (dist(mouseX, mouseY, 265, 150) < 30 && !soundFile3.isPlaying()) {
    soundFile3.play();
    console.log("3");
  }
}
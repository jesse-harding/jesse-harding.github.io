let soundFile1;
let bgImg;

var socket; //add socket object

var data;

function preload() {
  // soundFormats('mp3', 'ogg');
  soundFile1 = loadSound('https://jesse-harding.github.io/assets/spont/1.m4a');
  soundFile2 = loadSound('https://jesse-harding.github.io/assets/spont/2.m4a');
  soundFile3 = loadSound('https://jesse-harding.github.io/assets/spont/3.m4a');
  bgImg = loadImage('https://jesse-harding.github.io/assets/spont/spont.png')
}

function setup() {
  createCanvas(400, 400);

  data = { //make data object to send
    id: "",
    time: 0,
    meanwhile: false
  }
  
  socket = io.connect('https://ancient-eyrie-02539.herokuapp.com/'); //for heroku
  
  socket.on('server', serverMsg);
}

function draw() {
  // background(255);
  image(bgImg, 0, 0, width, height);
  
}

function mouseReleased() {
  if (dist(mouseX, mouseY, 135, 150) < 30 && !soundFile1.isPlaying()) {
    // soundFile1.play();
    data.time = -1;
    data.meanwhile = false;
  }
  if (dist(mouseX, mouseY, 200, 150) < 30 && !soundFile2.isPlaying()) {
    // soundFile2.play();
    data.time = 0;
    data.meanwhile = true;
  }
  if (dist(mouseX, mouseY, 265, 150) < 30 && !soundFile3.isPlaying()) {
    // soundFile3.play();
    data.time = -1;
    data.meanwhile = false;
  }
  console.log(data);
  socket.emit('mouse', data);
  data = { //make data object to send
    id: "",
    time: 0,
    meanwhile: false
  }
}

function serverMsg(msg){
  console.log(msg);
}

let mic, fft;

function setup() {
  getAudioContext().suspend();
  createCanvas(1024, 400);
  noFill();
    mic = new p5.AudioIn();
    fft = new p5.FFT();
      mic.start();
      fft.setInput(mic);
}

function draw() {
  background(200);

  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
//  console.log(spectrum[40]);
  
  if (spectrum[40] > 120 && spectrum[100] < 20){
    background(255,20,199);
  }
}

function mouseClicked() {
  userStartAudio();
}

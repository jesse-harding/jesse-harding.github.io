let mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  let h = map(vol, 0, 1, height, 0);
  ellipse(width / 2, h - 25, 50, 50);
}



// /**
//  * @name Frequency Spectrum
//  * @description <p>Visualize the frequency spectrum of live audio input.</p>
//  * <p><em><span class="small"> To run this example locally, you will need the
//  * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
//  * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
//  */
// let mic, fft;

// function setup() {
//   createCanvas(1024, 400);
//   noFill();

//   mic = new p5.AudioIn();
//   mic.start();
//   fft = new p5.FFT();
//   fft.setInput(mic);
//   console.log("start");
// }

// function draw() {
//   background(200);

//   let spectrum = fft.analyze();

//   beginShape();
//   for (i = 0; i < spectrum.length; i++) {
//     vertex(i, map(spectrum[i], 0, 255, height, 0));
//   }
//   endShape();
// //   console.log(spectrum[40]);
  
//   if (spectrum[40] > 120 && spectrum[100] < 20){
//     background(255,20,199);
//   }
// }

// function mouseClicked(){
//   mic.start();
//   fft.setInput(mic);
//   console.log("restart");
// }

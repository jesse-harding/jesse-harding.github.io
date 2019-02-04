/*
Serial read and animate example

Reads an ASCII-encoded string from a seiral port via a webSocket server.
Animates the text on the screen with the received value

You can use this with the included Arduino example called AnalogReadSerial.
Works with P5 editor as the socket/serial server, version 0.5.5 or later.

written 2 Oct 2015
by Tom Igoe
*/

// Declare a "SerialPort" object
var serial;
// fill in the name of your serial port here:
var portName = "/dev/cu.usbmodem1411";
var textXpos = 10;
var inMessage = [0, 0];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
}


// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  console.log(currentString);
      inMessage = split(currentString, '&');   // save the currentString to use for the text
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
    if (inMessage[1] == 1){
        fill(random(255),random(255),random(255));
        
    }
  text("pot value: " + inMessage[0], 30, 30);
  text("button value: " + inMessage[1], 30, 50);
  ellipse(width/2, height/2, map(inMessage[0], 0, 1023, 0, width), map(inMessage[0], 0, 1023, 0, height))
}

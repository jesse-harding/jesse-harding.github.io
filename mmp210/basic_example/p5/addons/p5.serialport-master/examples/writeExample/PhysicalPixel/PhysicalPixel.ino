#include <SPI.h>
#include <Arduino.h> #include <MusicPlayer.h> //#include <SD.h>
#define dataPin 8 #define clockPin 9 #define latchPin 10
#define dataPin2 5 #define clockPin2 6 #define latchPin2 7
#define dnote 4
#define plus 3 #define moin 2
//Define variables to hold the data
//for each shift register.
//starting with non-zero numbers can help //troubleshoot
byte switchVar1 = 0; byte switchVar2 = 0; byte switchVar3 = 0;

//int note = 0; int volu = 120; int ton = 100; int toff = 0;
int instru = 79;
int sensorvalue = 500;
void son (int myNote, int myVolu, int myTon, int myToff) {
player.midiNoteOn(0, myNote, myVolu); delay(myTon);
player.midiNoteOff(0, myNote, myVolu); delay(myToff);
}
int but(int x, int y, int h, int l) {
if ((digitalRead (moin) == HIGH) && (x<=(h-y))) { x=x+y;
}
else if ((digitalRead (plus) == HIGH) && (x>=(l+y))){
x=x-y; }

return x; }
void setup() {
//start serial
Serial.begin(9600);
player.beginInMidiFmt();
player.midiWriteData(0xB0, 0x07, 120); // set volume player.midiDemoPlayer();
//define pin modes pinMode(latchPin, OUTPUT); pinMode(clockPin, OUTPUT); pinMode(dataPin, INPUT);
pinMode(latchPin2, OUTPUT); pinMode(clockPin2, OUTPUT); pinMode(dataPin2, INPUT);
pinMode(dnote, INPUT);
pinMode(plus, INPUT);
pinMode(moin, INPUT); }
void loop() {
// delay(1000);

sensorvalue = analogRead(5); // Serial.println(sensorvalue);
// read value from different position
//
if (sensorvalue < 540){ Serial.println("1");
volu = but (volu, 5, 127, 0); Serial.println(volu);
delay (1000);
}
else if (sensorvalue < 620){
Serial.println("2");
ton = but (ton, 10, 10, 1000); Serial.println(ton);
}
else if (sensorvalue < 700){ Serial.println("3");
toff = but (toff, 10, 10, 1000); Serial.println(toff);
}
else if (sensorvalue < 780){
Serial.println("4"); player.midiWriteData(0xB0, 0, 0x78); player.midiWriteData(0xC0, 40, 0);
}
else if (sensorvalue < 815){ Serial.println("5"); player.midiWriteData(0xB0, 0, 0x79);

// set percussion 78 or synth 79
// set percussion 78 or synth 79
if (instru > 8)instru = 1;
instru = but(instru, 1, 8, 1); player.midiWriteData(0xC0, instru, 0); Serial.println(instru);
}
else if (sensorvalue < 845){ Serial.println("6"); player.midiWriteData(0xB0, 0, 0x79); if ((instru<9) || (instru>16)) instru = 9; instru = but(instru, 1, 16, 9); player.midiWriteData(0xC0, instru, 0); Serial.println(instru);
}
else if (sensorvalue < 870){
// set percussion 78 or synth 79
Serial.println("7"); player.midiWriteData(0xB0, 0, 0x79);
if ((instru<17) || (instru>24)) instru = 17; instru = but(instru, 1, 24, 17); player.midiWriteData(0xC0, instru, 0);
Serial.println(instru); }
else if (sensorvalue < 888){ Serial.println("8"); player.midiWriteData(0xB0, 0, 0x79);
if ((instru<25) || (instru>40)) instru = 25; instru = but(instru, 1, 40, 25); player.midiWriteData(0xC0, instru, 0);

// set percussion 78 or synth 79
// set percussion 78 or synth 79
Serial.println(instru); }
else if (sensorvalue < 910){
Serial.println("9");
player.midiWriteData(0xB0, 0, 0x79); // set percussion 78 or synth 79 if ((instru<41) || (instru>56)) instru = 41;
instru = but(instru, 1, 56, 41);
player.midiWriteData(0xC0, instru, 0);
Serial.println(instru); }
else if (sensorvalue < 928){ Serial.println("10"); player.midiWriteData(0xB0, 0, 0x79);
if ((instru<57) || (instru>80)) instru = 65; instru = but(instru, 1, 80, 57); player.midiWriteData(0xC0, instru, 0);
Serial.println(instru); }
else if (sensorvalue < 945){ Serial.println("11"); player.midiWriteData(0xB0, 0, 0x79);
if ((instru<81) || (instru>96)) instru = 91; instru = but(instru, 1, 96, 81); player.midiWriteData(0xC0, instru, 0);
Serial.println(instru); }
else if (sensorvalue < 1000){

// set percussion 78 or synth 79
// set percussion 78 or synth 79
Serial.println("12");
player.midiWriteData(0xB0, 0, 0x79); // set percussion 78 or synth 79 if ((instru<97) || (instru>124)) instru = 99;
instru = but(instru, 1, 120, 97);
player.midiWriteData(0xC0, instru, 0);
Serial.println(instru); }
else{ Serial.println("Error");
}
//Pulse the latch pin:
//set it to 1 to collect parallel data digitalWrite(latchPin,1);
//set it to 1 to collect parallel data, wait delayMicroseconds(20);
//set it to 0 to transmit data serially digitalWrite(latchPin,0);
//while the shift register is in serial mode //collect each shift register into a byte
//the register attached to the chip comes in first switchVar1 = shiftIn(dataPin, clockPin); switchVar2 = shiftIn(dataPin, clockPin);

//Pulse the latch pin:
//set it to 1 to collect parallel data digitalWrite(latchPin2,1);
//set it to 1 to collect parallel data, wait delayMicroseconds(20);
//set it to 0 to transmit data serially digitalWrite(latchPin2,0);
switchVar3 = shiftIn(dataPin2, clockPin2);
//Print out the results.
//leading 0's at the top of the byte //(7, 6, 5, etc) will be dropped before //the first pin that has a high input //reading
Serial.println(switchVar1, BIN); Serial.println(switchVar2, BIN); Serial.println(switchVar3, BIN);
//This is a away to examine the whole //byte at once and create combinations //of settings.
//By passing the switchVar1 variable to
//a "switch" statement and comparing it against //a set nemerical value (written in binary)
//you can create special cases

switch (switchVar1) { case B1:
son (55, volu, ton, toff);
break; case B10:
son (53, volu, ton, toff);
break; case B100:
son (52, volu, ton, toff);
break; case B1000:
son (50, volu, ton, toff);
break;
case B10000:
son (54, volu, ton, toff);
break;
case B100000:
son (51, volu, ton, toff);
break;
case B1000000:
son (49, volu, ton, toff);
break;
case B10000000:
son (48, volu, ton, toff);
break; }

//--- SHIFT REGISTER 2
// This is a more complicated behavior
switch (switchVar2) { case B1:
son (59, volu, ton, toff);
break; case B10:
son (58, volu, ton, toff);
break; case B100:
son (60, volu, ton, toff);
break; case B1000:
son (57, volu, ton, toff);
break;
case B10000:
son (63, volu, ton, toff);
break;
case B100000:
son (62, volu, ton, toff);
break;
case B1000000:
son (61, volu, ton, toff); break;

case B10000000:
son (56, volu, ton, toff); break;
}
//If the switch attached to pin 7 is High
//--- SHIFT REGISTER 3
switch (switchVar3) { case B1:
son (71, volu, ton, toff);
break; case B10:
son (65, volu, ton, toff);
break; case B100:
son (69, volu, ton, toff);
break; case B1000:
son (67, volu, ton, toff);
break;
case B10000:
son (70, volu, ton, toff);
break;
case B100000:
son (66, volu, ton, toff);

break;
case B1000000:
son (68, volu, ton, toff);
break;
case B10000000:
son (64, volu, ton, toff);
break; }
if (digitalRead (dnote) == HIGH) son (72, volu, ton, toff);
//white space
Serial.println("-------------------");
//delay so all these print satements can keep up. //delay(50);
}
//------------------------------------------------end main loop
////// ----------------------------------------shiftIn function
///// just needs the location of the data pin and the clock pin ///// it returns a byte with each bit in the byte corresponding ///// to a pin on the shift register. leftBit 7 = Pin 7 / Bit 0= Pin 0 byte shiftIn(int myDataPin, int myClockPin) {
int i;

int temp = 0;
int pinState;
byte myDataIn = 0;
pinMode(myClockPin, OUTPUT);
pinMode(myDataPin, INPUT);
//we will be holding the clock pin high 8 times (0,..,7) at the //end of each time through the for loop
//at the begining of each loop when we set the clock low, it will //be doing the necessary low to high drop to cause the shift //register's DataPin to change state based on the value
//of the next bit in its serial information flow.
//The register transmits the information about the pins from pin 7 to pin 0 //so that is why our function counts down
for (i=7; i>=0; i--) {
digitalWrite(myClockPin, 0); delayMicroseconds(2);
temp = digitalRead(myDataPin); if (temp) {
pinState = 1;
//set the bit to 0 no matter what myDataIn = myDataIn | (1 << i);
}
else {
//turn it off -- only necessary for debuging

//print statement since myDataIn starts as 0 pinState = 0;
}
//Debuging print statementss //Serial.print(pinState); //Serial.print(" "); //Serial.println (dataIn, BIN);
digitalWrite(myClockPin, 1);
}
//debuging print statements whitespace //Serial.println(); //Serial.println(myDataIn, BIN);
return myDataIn;
}

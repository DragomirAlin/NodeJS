
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
 Servo myservo;  // create servo object to control a servo
#define SS_PIN 10
#define RST_PIN 9
int ledR = 2;
int ledV = 4;
int buzzer = 5;
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Instanta MFRC522 
 int pos = 90;    // variable to store the servo position
void setup() 
{
  Serial.begin(9600);   
  SPI.begin();      // Initializare  SPI bus
  mfrc522.PCD_Init();   // Initializare MFRC522
  myservo.attach(6);  // attaches the servo on pin 9 to the servo object
  Serial.println("Apropiați-vă cardul de cititor ...");
  Serial.println();
  pinMode(ledR, OUTPUT);
  pinMode(ledV, OUTPUT);
  pinMode(buzzer, OUTPUT);

}
void loop() 
{
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
 //  Serial.print("UID tag :"); 
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
    // Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "); // Afisare ID tag
    // Serial.print(mfrc522.uid.uidByte[i], HEX); // Afisare ID tag
    
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  
  Serial.println();
 //Serial.print("Acces : ");
  content.toUpperCase();
  if (content.substring(1) == "19 8A AF 6E") //Acces card
  {
    Serial.println("Dragomir Alin");
    Serial.print("Acces : ");
    Serial.println("Autorizat");
    Serial.println();
    digitalWrite(ledV, HIGH);
for (pos = 90; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
    delay(3000);
for (pos = 180; pos >= 90; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
    digitalWrite(ledV, LOW);
  }
 
 else   {
    Serial.println("Persoană necunoscuă");
    Serial.print("Acces : ");
    Serial.println("Interzis");
     digitalWrite(ledR, HIGH);
     digitalWrite(buzzer, HIGH);
    delay(3000);
    digitalWrite(buzzer, LOW);
    digitalWrite(ledR, LOW);
    
  }
  
}

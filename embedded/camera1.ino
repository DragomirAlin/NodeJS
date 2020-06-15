#include <ESP8266WiFi.h>
#include <WebSocketClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ArduinoJson.h>
#define DHTPIN D3
#define DHTTYPE DHT11
#include <WebSocketsServer.h>

WebSocketsServer webSocket = WebSocketsServer(3000); // setare port ws
boolean handshakeFailed=0;
String data= ""; // buffer
String data2 ="";
String data3 = "";
char path[] = "/";   // identificator pentru dispozitiv
const char* ssid     = "SmartHome";
const char* password = "66294894";
char* host = "192.168.0.102";  // adresa serverului
const int espport= 3000;
size_t measureJsonPretty(const JsonDocument& doc); 


int flame = D0; // pin senzor flacără
DHT dht3 = DHT(D1, DHTTYPE); // senzor DTH11
  
WebSocketClient webSocketClient;
unsigned long previousMillis = 0;
unsigned long currentMillis;
unsigned long interval=300// interval pentru trimiterea datelor către serverul websocket în ms; 
WiFiClient client; // pentru a crea conexiuni TCP


void setup() {
  Serial.begin(115200);
    dht3.begin();
  pinMode(flame, INPUT);
  delay(10);

  // Conectarea la rețeaua WiFi
  Serial.println();
  Serial.println();
  Serial.print("Conectare la ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
      }
  Serial.println("");
  Serial.println("WiFi Conexiune reușită!");  
  Serial.println("Adresa IP: ");
  Serial.println(WiFi.localIP());
  delay(1000);


 
wsconnect();
//  wifi_set_sleep_type(LIGHT_SLEEP_T);
}


void loop() {
  webSocket.loop(); 
  int sensorValue = analogRead(0);
  float sensor_volt=(float)sensorValue/1024*5.0;
  float limitasenzor = 3;
  int fire = digitalRead(flame); 
    
  if (client.connected()) {
      currentMillis=millis(); 
     StaticJsonDocument<300> doc; // memorie alocată pentru doc
         doc["camera"] = 1;
         doc["temperatura"] = (float)dht3.readTemperature();
         doc["umiditatea"] = (float)dht3.readHumidity();
   if (sensor_volt > limitasenzor)
     {
         doc["nivelGaz"] = "ridicat";
     }else{ 
         doc["nivelGaz"] = "scazut";
    }
     if (fire == HIGH){
         doc["foc"] = "OK"; 
    }else{
         doc["foc"] = "arde!"; 
  }

   
  delay(200);

    String buffer;
    serializeJsonPretty(doc, buffer); // serializare document JSON
    Serial.println(buffer);
    webSocketClient.getData(buffer); 

  if (buffer.length() > 0  ) {
 //currentMillis=millis();

  if (abs(currentMillis - previousMillis) >= interval) {
      previousMillis = currentMillis;
              delay(1000);
      webSocketClient.sendData(buffer); //trimitere document spre server
}
  }else{
    }
        delay(5);
  }
}

void wsconnect(){
  // Conectarea la serverul Websocket
  if (client.connect(host, espport)) {
    Serial.println("Conectat!");
  } else {
    Serial.println("Conectare eșuată!");
      delay(1000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
    }
    handshakeFailed=1;
  }
           // Handshake cu serverul
      webSocketClient.path = path;
      webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake succes!");
  }else { 
    Serial.println("Handshake eșuat!");
   delay(4000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
    }
    handshakeFailed=1;
  }
}
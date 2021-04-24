#include <ESP8266WiFi.h>
#include <WebSocketClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ArduinoJson.h>
#define DHTPIN D3
#define DHTTYPE DHT11
#include <WebSocketsServer.h>

WebSocketsServer webSocket = WebSocketsServer(3000);
boolean handshakeFailed=0;
String data= "";
String data2 ="";
String data3 = "";
char path[] = "/";
const char* ssid     = "SmartHome";
const char* password = "66294894";
char* host = "192.168.0.102";
const int espport= 3000;
size_t measureJsonPretty(const JsonDocument& doc);


int senzorapa = D0;
const int sensorMagneticDoor = D2;
int state; // 0 close - 1 open wwitch
DHT dht3 = DHT(D1, DHTTYPE);
  
WebSocketClient webSocketClient;
unsigned long previousMillis = 0;
unsigned long currentMillis;
unsigned long interval=300;
WiFiClient client;


void setup() {
  Serial.begin(115200);
    dht3.begin();
    pinMode(senzorapa, INPUT);
    pinMode(sensorMagneticDoor, INPUT_PULLUP);

    
  delay(10);
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
  float limitasenzor = 500;
  state = digitalRead(sensorMagneticDoor);
  int sza = digitalRead(senzorapa);

    
  if (client.connected()) {
      currentMillis=millis(); 
     StaticJsonDocument<300> doc;
         doc["camera"] = 3;
         doc["temperatura"] = (float)dht3.readTemperature();
         doc["umiditatea"] = (float)dht3.readHumidity();
   if (sensorValue > limitasenzor)
     {
         doc["plante"] = "UDĂ!";
     }else{ 
         doc["plante"] = "OK!";
    }
   
    if (state == HIGH){
         doc["usa"] = "deschisă"; 
    }else{
         doc["usa"] = "inchisă"; 
  }

    if (sza == HIGH){
         doc["apa"] = "OK"; 
    }else{
         doc["apa"] = "Scurgeri"; 
  }
  
  delay(200);

    String buffer;
    serializeJsonPretty(doc, buffer);
    Serial.println(buffer);
    webSocketClient.getData(buffer); 

  if (buffer.length() > 0  ) {
  if (abs(currentMillis - previousMillis) >= interval) {
      previousMillis = currentMillis;
              delay(1000);
      webSocketClient.sendData(buffer);
}
  }else{
    }
        delay(5);
  }
}

void wsconnect(){
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

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


int buzzer = D0;
DHT dht3 = DHT(D3, DHTTYPE);
  
WebSocketClient webSocketClient;
unsigned long previousMillis = 0;
unsigned long currentMillis;
unsigned long interval=300;
WiFiClient client;


void setup() {
  Serial.begin(115200);
    dht3.begin();
    pinMode(buzzer, OUTPUT);

  delay(10);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
      }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(1000);


 
wsconnect();
//  wifi_set_sleep_type(LIGHT_SLEEP_T);
}


void loop() {
  webSocket.loop();
  int sensorValue = analogRead(0);
  float sensor_volt=(float)sensorValue/1024*5.0;
  int limitasenzor = 2;

    
  if (client.connected()) {
      currentMillis=millis(); 
     StaticJsonDocument<300> doc;
         doc["camera"] = 1;
         doc["temperatura"] = (float)dht3.readTemperature();
         doc["umiditatea"] = (float)dht3.readHumidity();
   if (sensor_volt > limitasenzor)
     {
      Serial.println(sensor_volt);
      digitalWrite(buzzer, HIGH);
         doc["nivelGaz"] = "ridicat";
     }else{ 
      Serial.println(sensor_volt);
      digitalWrite(buzzer, LOW);
         doc["nivelGaz"] = "scazut";
    }
   
  delay(200);

    String buffer;
    serializeJsonPretty(doc, buffer);
    Serial.println(buffer);
    webSocketClient.getData(buffer); 

  if (buffer.length() > 0  ) {
    //*************send log data to server in certain interval************************************
 //currentMillis=millis();

  if (abs(currentMillis - previousMillis) >= interval) {
      previousMillis = currentMillis;
              delay(5000);
      webSocketClient.sendData(buffer);
}
  }else{
    }
        delay(5);
  }
}

void wsconnect(){
  if (client.connect(host, espport)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
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
    Serial.println("Handshake successful");
  }else { 
    Serial.println("Handshake failed.");
   delay(4000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
    }
    handshakeFailed=1;
  }
}

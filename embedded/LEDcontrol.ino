#include <ESP8266WiFi.h>
 
const char* ssid = "SmartHome";
const char* password = "66294894";
 
int ledPin = D2;
int ledPin2 = D1;
int ledPin3 = D0;
WiFiServer server(80);
 
void setup() {
  Serial.begin(115200);
  delay(10);
 
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  pinMode(ledPin2, OUTPUT);
  digitalWrite(ledPin2, LOW);

  pinMode(ledPin3, OUTPUT);
  digitalWrite(ledPin3, LOW);
 
  // Connect to WiFi network
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
 
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.print("Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
 
}
 
void loop() {
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
 
  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
 
  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();
 
  // Match the request
 
  int value = LOW;
  if (request.indexOf("/1/LED=ON") != -1)  {
    digitalWrite(ledPin, HIGH);
    value = HIGH;
  }
  if (request.indexOf("/1/LED=OFF") != -1)  {
    digitalWrite(ledPin, LOW);
    value = LOW;
  }

   int value2 = LOW;
  if (request.indexOf("/2/LED=ON") != -1)  {
    digitalWrite(ledPin2, HIGH);
    value2 = HIGH;
  }
  if (request.indexOf("/2/LED=OFF") != -1)  {
    digitalWrite(ledPin2, LOW);
    value2 = LOW;
  }

   int value3 = LOW;
  if (request.indexOf("/3/LED=ON") != -1)  {
    digitalWrite(ledPin3, HIGH);
    value3 = HIGH;
  }
  if (request.indexOf("/3/LED=OFF") != -1)  {
    digitalWrite(ledPin3, LOW);
    value3 = LOW;
  }
 
// Set ledPin according to the request
//digitalWrite(ledPin, value);
 
  // Return the response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println(""); //  do not forget this one
  client.println("<!DOCTYPE HTML>");
  client.println("<html>");
 
  client.println("Led is now: ");
 
  if(value == HIGH) {
    client.println("On - 1");
  } else {
    client.println("Off - 1");
  }

  if(value2 == HIGH) {
    client.println("On - 2");
  } else {
    client.println("Off - 2");
  }

  if(value3 == HIGH) {
    client.println("On - 3");
  } else {
    client.println("Off - 3");
  }
  client.println("<br><br>");
  client.println("<a href=\"/LED=ON\"\"><button>On </button></a>");
  client.println("<a href=\"/LED=OFF\"\"><button>Off </button></a><br />");  
  client.println("</html>");
 
  delay(1);
  Serial.println("Client disonnected");
  Serial.println("");
 
}

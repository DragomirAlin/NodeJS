var bodyParser = require("body-parser");
const express = require('express'); //express framework to have a higher level of methods
const app = express(); //assign app variable the express class/method
var MongoClient = require('mongodb').MongoClient;
var product = require('./routes/product'); // Imports routes for the products
var url = "mongodb://localhost:27017/dbSHome";
var http = require('http');
var path = require("path");
const cors = require('cors');


var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err);
  });

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/products', product);


const server = http.createServer(app);//create a server
//***************this snippet gets the local ip of the node.js server. copy this ip to the client side code and add ':3000' *****
//****************exmpl. 192.168.56.1---> var sock =new WebSocket("ws://192.168.56.1:3000");*************************************
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: ' + add);
})


/**********************websocket setup**************************************************************************************/
//var expressWs = require('express-ws')(app,server);
const WebSocket = require('ws');
const s = new WebSocket.Server({ server });
const wss1 = new WebSocket.Server({ noServer: true });

//when browser sends get request, send html file to browser
// viewed at http://localhost:30000
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


//app.ws('/echo', function(ws, req) {
s.on('connection', function (ws, req) {
  /******* when server receives messsage from client trigger function with argument message *****/
  ws.on('message', function (message) {
    var jsontest = JSON.parse(message);
    jsontest.last_updated = new Date();


    setTimeout(function () {
      console.log('Camera: ' + jsontest.camera);
      console.log('Temperatura: ' + jsontest.temperatura);
      console.log('Umiditatea: ' + jsontest.umiditatea);
      console.log('Nivelul de gaz: ' + jsontest.nivelGaz);
      console.log('');
    }, 5000);

    MongoClient.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (err) return console.log(err);
        var db = db.db("dbSHome");

        db.collection("products").insertOne(jsontest, function (err, res) {
          if (err) throw err;
          console.log("Document inserted");
        });
      });
    // ws.send("From Server only to sender: "+ message); //send to client where message is from
  });
 

  ws.on('close', function () {
    console.log("lost one client");
  });
});





// wss1.on('connection', function connection(wss1, req) {
//   server.on('upgrade', function upgrade(request, socket, head) {
//     const pathname = url.parse(request.url).pathname;
  
//     if (pathname === '/LED=ON') {
//       wss1.handleUpgrade(request, socket, head, function done(ws) {
//         wss1.emit('connection', ws, request);
//       });
//     } else if (pathname === '/LED=OFF') {
//       wss2.handleUpgrade(request, socket, head, function done(ws) {
//         wss2.emit('connection', ws, request);
//       });
//     } else {
//       socket.destroy();
//     }
//   });
// });



server.listen(3000);

var port = 1234;
app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});

//the service that the app has to call
app.post('/setLightStatus', (req, res) => {

  let newLightStatus = {
      redLight: req.body.red,
      yellowLight: req.body.yellow
  };
  lights.setStatus(newLightStatus, (status)=>{
      console.log("changed light status to " +  JSON.stringify(status, null, 2));
      res.send(status);
  });

});
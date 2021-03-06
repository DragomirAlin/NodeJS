var bodyParser = require("body-parser");
const express = require('express');
const app = express();
var room = require('./routes/room.routers');
var raspi = require('./routes/raspi.routers');
var rfid = require('./routes/rfid.routers');
var url = "mongodb://mongo:27017/dbSHome";
var http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const PiCamera = require('pi-camera');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongoose2 = require('mongoose');


var mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err);
  });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error 1:'));




var mongoDB2 = process.env.MONGODB_URI || url;
 mongoose2.connect(mongoDB2,{ useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    });
mongoose2.Promise = global.Promise;
var db2 = mongoose2.connection;
db2.on('error', console.error.bind(console, 'MongoDB connection error 2:'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/rooms', room); 
app.use('/raspi', raspi);
app.use('/rfid', rfid);

const server = http.createServer(app);//create a server
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: ' + add);
})


const s = new WebSocket.Server({ server });
s.on('connection', function (ws, req) {
  ws.on('message', function (message) {
    var json = JSON.parse(message);
    json.last_updated = new Date();
    setTimeout(function () {
      console.log('Camera: ' + json.camera);
      console.log('Temperatura: ' + json.temperatura);
      console.log('Umiditatea: ' + json.umiditatea);
      console.log('Nivelul de gaz: ' + json.nivelGaz);
      console.log('Stare usa: ' + json.usa);
      console.log('Senzor flacara: ' + json.foc);
      console.log('Calitate aer: ' + json.aer);
      console.log('');
    }, 5000);

    MongoClient.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (err) return console.log(err);
        var db = db.db("dbSHome");
        db.collection("rooms").insertOne(json, function (err, res) {
          if (err) throw err;
          console.log("Document inserted");
        });
      });
  });
  ws.on('close', function () {
    console.log("lost one client");
  });
});

const myCamera = new PiCamera({
  mode: 'video',
  output: `${ __dirname }/test1.h264`,
  width: 640,
  height: 480,
  timeout: 0, // Record for 5 seconds
  nopreview: true,
  datatime: true,
});

myCamera.record()
  .then((result) => {
    console.log("The video has starting.")
  })
  .catch((error) => {
     // Handle your error
  });

server.listen(3000);
console.log('Server is up and running on port number ' + 3000);

var bodyParser = require("body-parser");
const express = require('express');
const app = express();
var room = require('./routes/room.routers')
var raspi = require('./routes/raspi.routers');
var rfid = require('./routes/rfid.routers');
var url = "mongodb://mongo:27017/dbSHome";
var http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err);
  });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error 1:'));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/rooms', room);
app.use('/raspi', raspi);
app.use('/rfid', rfid);

const server = http.createServer(app);

const s = new WebSocket.Server({ server });
s.on('connection', function (ws, req) {
  ws.on('message', function (message) {
    var json = JSON.parse(message);

    setTimeout(function () {
      console.log('Camera: ' + json.camera);
      console.log('Temperatura: ' + json.temperatura);
      console.log('Umiditatea: ' + json.umiditatea);
      console.log('Nivelul de gaz: ' + json.nivelGaz);
      console.log('Stare usa: ' + json.usa);
      console.log('Senzor flacara: ' + json.foc);
      console.log('Senzor de picaturi: ' + json.apa);
      console.log('Aer: ' + json.aer)
      console.log('Plante: ' + json.plante);
      console.log('');
    }, 1000);

    MongoClient.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (err) return console.log(err);
        var db = db.db("dbSHome");
        db.collection("rooms").insertOne(json, function (err, res) {
          if (err) throw err;
        });
      });
  });
  ws.on('close', function () {
    console.log("închidere ws");
  });
});

server.listen(3000);
console.log('The Server is up, port ' + 3000);

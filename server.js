var bodyParser = require("body-parser");
const express = require('express'); //express framework to have a higher level of methods
const app = express(); //assign app variable the express class/method

var product = require('./routes/product'); // Imports routes for the products
var url = "mongodb://localhost:27017/dbSHome";
var http = require('http');
var path = require("path");
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
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/products', product);


const server = http.createServer(app);//create a server
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: ' + add);
})

const WebSocket = require('ws');
const s = new WebSocket.Server({ server });
const wss1 = new WebSocket.Server({ noServer: true });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

s.on('connection', function (ws, req) {
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
  });
 
  ws.on('close', function () {
    console.log("lost one client");
  });
});

server.listen(3000);
console.log('Server is up and running on port number ' + 3000);

var bodyParser = require("body-parser"); // analizează documentele JSON (req.body)
const express = require('express'); //oferă un set  de funcții pentru aplicație
const app = express(); // asignare express
var room = require('./routes/room.routers'); // importul rutelor pentru camere
var raspi = require('./routes/raspi.routers'); //  importul rutelor pentru raspiberry PI
var rfid = require('./routes/rfid.routers'); // importul rutelor pentru acces RFID
var url = "mongodb://mongo:27017/dbSHome"; // adresa URL a bazei de date
// var url2 = "mongodb+srv://alin:alin@database-2t2ug.mongodb.net/RFID?retryWrites=true&w=majority"; // adresă URL bază de date în CLOUD
var http = require('http'); 
const WebSocket = require('ws');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongoose2 = require('mongoose');

//Conectarea la baza de date
var mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err);
  });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error 1:'));

//Conectarea la baza de date
var mongoDB2 = process.env.MONGODB_URI || url;
 mongoose2.connect(mongoDB2,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    });
mongoose2.Promise = global.Promise;
var db2 = mongoose2.connection;
db2.on('error', console.error.bind(console, 'MongoDB connection error 2:'));


app.use(cors()); // activare CORS - Cross Origin Resource Sharing
app.use(bodyParser.urlencoded({ extended: true })); // suport pentru application/x-www-urlencoded post data
app.use(bodyParser.json()); // suport pentru analiza datelor de tip post
app.use('/rooms', room);  // rută spre metodele din room
app.use('/raspi', raspi); // rută spre metodele din raspi
app.use('/rfid', rfid); // rută spre metodele din rfid

const server = http.createServer(app); // o instață a serverului HTTP pentru a gestiona cererile

const s = new WebSocket.Server({ server }); // Stabilire conexiune WebSocket 
s.on('connection', function (ws, req) { // deschidere conexiune
  ws.on('message', function (message) { // recepția datelor în message
    var json = JSON.parse(message); // parsare document JSON

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
    }, 1000); // setare interval pentru afisare (1sec)

    //Conexiune cu baza de date pentru inserarea datelor de la module
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

server.listen(3000); // Pornirea serverului cu portul 3000
console.log('Serverul este pornit, funcționează pe portul ' + 3000);

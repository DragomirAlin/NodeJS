var rfidUser = require('../models/rfid.models');
var logs = require('../models/logs.models');

// Funcție pentru creare user
exports.user_create = function (req, res) {
    var user = new rfidUser({
        uid: req.body.uid,
        nume: req.body.nume
    });
    
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('Utilizator creat cu succes!')
  })
};

// Funcție pentru ștergere user
exports.user_delete = function (req, res){
 id = req.params.uid;
  rfidUser.deleteOne({
    uid : id
  }, function(err, _){
    if (err) return res.send(err)
    res.json({
      message: 'Utilizatorul a fost șters!'
    })
  })
}

// Funcție pentru vizualizarea tuturor utilizatorilor
exports.view_all_user = function(req, res){
  rfidUser.find()
  .then(data => {
      res.send(data);
      return data;
  }).catch(err => {
    console.log("Eroare: " + err);
    next(err);
  });
};

// Funcție pentru vizualizarea log-urilor
exports.view_all_logs = function(req, res){
  logs.find()
  .then(data => {
      res.send(data);
      return data;
  }).catch(err => {
    console.log("Eroare: " + err);
    next(err);
  });
};

// Funcție pentru căutare log-uri după nume
exports.search_logs_nume = function(req, res){
  const id = req.params.nume;
  logs.find({
    nume : id
  }).then(data => {
    res.send(data);
    return data;
}).catch(err => {
  console.log("Eroare: " + err);
  next(err);
});
}

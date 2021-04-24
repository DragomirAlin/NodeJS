var rfidUser = require('../models/rfid.models');
var logs = require('../models/logs.models');

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

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
    res.send('User Created successfully')
  })
};

exports.user_delete = function (req, res){
 id = req.params.uid;
  rfidUser.deleteOne({
    uid : id
  }, function(err, _){
    if (err) return res.send(err)
    res.json({
      message: 'ok'
    })
  })
}

exports.view_all_logs = function(req, res){
  logs.find()
  .then(data => {
      res.send(data);
      return data;
  }).catch(err => {
    console.log("Error for view all logs");
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
  console.log("Error for search log by name");
  next(err);
});
}

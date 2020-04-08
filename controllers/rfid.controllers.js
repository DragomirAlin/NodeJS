var rfidUser = require('../models/rfid.models');

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

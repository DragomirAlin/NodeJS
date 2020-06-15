var Room = require('../models/room.models');
const roomService = require("../service/room.service");
var http = require('http');

// Funcție pentru crearea unui document
exports.room_create = function (req, res) {
  var room = new Room(
    {
      camera: req.body.camera,
      temperatura: req.body.temperatura,
      umiditatea: req.body.umiditatea,
      nivelGaz: req.body.nivelGaz,
      usa: req.body.usa,
      foc: req.body.foc,
      aer : req.body.aer,
      plante : req.body.plante,
    }
  );

  room.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('Room Created successfully')
  })
};

//Funcție care aplează Service roomByID
exports.roomById = async (request, response, next) => {
  const roomId = request.params.id;
  roomService
    .getRoomByID(roomId)
    .then(room => response.send(room))
    .catch(err => {
      console.log("Eroare: " + err);
      next(err);
    });
};

// Funcția de UPDATE document
exports.room_update = function (req, res) {
  Room.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, room) {
    if (err) return next(err);
    res.send('Room updated.');
  });
};

// Funcția de DELETE
exports.room_delete = function (req, res) {
  Room.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
};

// Metodă GET pentru aprindere LED
exports.room_1_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/1/LED=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("status cod: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Light 1 - ON")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru stingere LED
exports.room_1_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/1/LED=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Light 1 - OFF")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru aprindere LED
exports.room_2_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/2/LED=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Light 2 - ON")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru stingere LED
exports.room_2_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/2/LED=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Light 2 - OFF")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru aprindere LED
exports.room_3_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/3/LED=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Light 3 - ON")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru stingere LED
exports.room_3_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/3/LED=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode LED 1: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Light 3 - OFF")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru pornire ventilator
exports.room_air_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/AIR=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Ventilator - ON")
      return res.send(chunk);
    });
  });
}

// Metodă GET pentru oprire ventilator
exports.room_air_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/AIR=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    console.log("statusCode: " + httpRes.statusCode);
    httpRes.on("data", function (chunk) {
      // console.log("data", chunk);
      console.log("Ventilator OFF")
      return res.send(chunk);
    });
  });
}

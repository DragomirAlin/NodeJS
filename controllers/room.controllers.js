var Room = require('../models/room.models');
const roomService = require("../service/room.service");
var http = require('http');

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
    }
  );

  room.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send('Room Created successfully')
  })
};


exports.roomById = async (request, response, next) => {
  const roomId = request.params.id;
  roomService
    .getRoomByID(roomId)
    .then(room => response.send(room))
    .catch(err => {
      console.log("here");
      next(err);
    });
};

exports.getOS = async (request, response, next) => {
  roomService
    .getOS()
    .then(data => response.send(data))
    .catch(err => {
      console.log("Eroare getOS");
      next(err);
    });
}

exports.room_update = function (req, res) {
  Room.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, room) {
    if (err) return next(err);
    res.send('Room updated.');
  });
};

exports.room_delete = function (req, res) {
  Room.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
};

exports.room_1_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/1/LED=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 1 - ON")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_1_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/1/LED=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 1 - OFF")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_2_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/2/LED=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 2 - ON")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_2_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/2/LED=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 2 - OFF")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_3_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/3/LED=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 3 - ON")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_3_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/3/LED=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode LED 1: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 3 - OFF")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_air_on = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/AIR=ON",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode LED 1: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 3 - OFF")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}

exports.room_air_off = function (req, res) {
  const options = {
    host: "192.168.0.101",
    path: "/AIR=OFF",
    headers: {
      "Content-Type": "text/html",
    }
  };
  const httpReq = http.get(options, function (httpRes) {
    //output status code to your console
    console.log("statusCode LED 1: " + httpRes.statusCode);

    httpRes.on("data", function (chunk) {
      // still nothing happens on client - this will also just print to server console
      // console.log("data", chunk);
      console.log("Light 3 - OFF")
      // return some data for requested route
      return res.send(chunk);
    });
  });
}








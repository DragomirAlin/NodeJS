var OS = require('../models/raspi.models');
var Network = require('../models/net.models');
var FileSystem = require('../models/filesyst.models');
var currentLoadSchema = require('../models/currLoad.models');
var Memory = require('../models/mem.models');
var CPU = require('../models/cpu.models');
var DockerProcess = require('../models/docker.models');
var NetworkConnection = require('../models/netConec.models');

const si = require('systeminformation');


exports.operating_system = function (req, res) {
    si.osInfo()
      .then(data => {
        data;
        var os = new OS({
          platform: data.platform,
          hostname: data.hostname
        })
        res.send(os);
      })
   
  };
  
exports.network_test = function (req, res) {
  si.networkGatewayDefault()
      .then(data => {
        data;
        var net = new Network({
          ip4 : data,
          // speed : data[0].speed,
          dhcp : "dddd"
        })
        res.send(net);
      })
};



exports.file_system = function (req, res) {
  si.fsSize('/home/pi')
      .then(data => {
        data;
      var fs = new FileSystem({
        device = data[0].fs,
        size = data[0].size
      })
      res.send(fs);
      })
}

exports.process_load = function (req, res) {
  si.currentLoad()
      .then(data => {
        data;
      var pl = new currentLoadSchema({
        currentload : data.currentload,
        currentsystem : data.currentload_system
      })
        res.send(pl);
      })
}

exports.memory = function (req, res) {
  si.mem()
      .then(data => {
        data;
        var memory = new Memory({
          total: data.total,
          free: data.free,
          used: data.used
        })
        res.send(memory);
      })
}

exports.cpu = function (req, res) {
  si.cpuTemperature()
      .then(data => {
        data;
        var cpu = new CPU({
          main : data.main
        })
        res.send(cpu);
      })
}

exports.docker = function (req, res) {
  si.dockerContainers(all)
      .then(data => {
        data;
        var docker = new DockerProcess({
          state : data[0].name,
          elapsed : data[0].id,
        })
        res.send(docker);
      })
}

exports.network_connection = function (req, res) {
  si.wifiNetworks()	
      .then(data => {
        data;
        var netCon = new NetworkConnection({
          ssid :  data[0].ssid,
          signal : data[0].signalLevel,
          quality : data[0].quality
         
        })
        res.send(netCon);
      })
}


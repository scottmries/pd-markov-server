var express = require('express');
// request allows us to make http requests to external apis
var request = require('request');
var path = require('path');
var fs = require('fs');
var app = express();
// node-osc is a wrapper on the module osc-min
// It has OSC 'emitting' and 'recieving' functionality
var osc = require('node-osc');

var rhythms = require('./scripts/rhythms.js');

// load up index.html with ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// our index route
app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('index.html');
})

// gotta tell our node app to open its ears
var server = app.listen(3000, function() {
  console.log('listening at localhost:3000');
})

// load up socket.io and have it listen within our node server
var io = require('socket.io')(server);

// Connect our osc listener to 0.0.0.0:9999,
// where our patch is emitting events
var oscServer = new osc.Server(9997, '127.0.0.1');

// when socket.io is connected, listen for osc messages
io.on('connection', function(socket) {
  oscServer.on('message', function (msg, rinfo) {
    // when a message is recieved, http GET a randomly generated
    // user JSON blob
    if(msg[0].indexOf('triggerRhythm') > -1){
      let rhythmIndex = msg[0].split('triggerRhythm')[1]
      rhythms.setAllowedRhythm(rhythmIndex, msg[1])
      console.log(rhythms.allowedRhythms)
    }
    // rhythms
    // console.log(msg)
  })
})

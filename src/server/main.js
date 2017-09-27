// Load modules
var socket = require('socket.io');
var express = require('express');
var http = require('http');
var init = require('./init.js');

// initialization
var app = express();
var server = http.createServer(app);
var port = init.port;
var io = socket.listen(server);


// Start appim as stand alone server
var appim = require('./index.js');

var appimServer = new appim(app,io,init);

var port=init.port;

app.use(express.static('test'));

server.listen(init.port, function(){
    console.log('Server listening on port ' + init.port + '!');
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/test/index.html');
});

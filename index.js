var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
app.use(express.static(__dirname));

// Local libraries
var Game = require('./game.js');
var Player = require('./player');

// The current game (yes, only one instance)
var game = new Game(io);

// Globals
var connectCounter = 0;

// When a person joins
io.on('connection', function (socket) {
  connectCounter++;

  // Create a player for the person
  var player = new Player(socket.id);
  
  // Join the game and assign a type
  io.sockets.emit('text', "A player joined!");
  game.join(player);
  socket.emit('player', { type: player.type, number: connectCounter });

  //player.goTo({ x: 10, y: 10 });
  
  socket.on('click', function(data){
    if (player.type == 'npc') {
      
      player.goTo({ x: data.position.left, y: data.position.top });
    } else {
      //game.shoot(data);
    }
    
    socket.emit('message', data);
  });
  
  socket.on('disconnect', function () {
    connectCounter--;
    io.sockets.emit('text', "A player left the game :(");

    if (player.is('sniper')) {
      game.end('spy');
    }
    game.remove(player);
  });
  
  if (game.players.length > 0) {
    console.log("Game started");
    game.start();
  }
});

server.listen(process.env.PORT || 3000);

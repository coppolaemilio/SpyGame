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

// When a person joins
io.on('connection', function (socket) {
  
  // Create a player for the person
  var player = new Player(socket.id);
  
  // Join the game and assign a type
  game.join(player);
  socket.emit('player', player.type);
  player.goTo(10, 10);
  
  socket.on('click', function(data){
    
    if (player.type == 'npc') {
      player.goTo(data.position.left, data.position.top);
    } else {
      //game.shoot(data);
    }
    
    socket.emit('message', data);
  });
  
  socket.on('disconnect', function () {
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



//app.use('/documentation/', controller.documentation);
//app.use('/plugins/:name', controller.plugins);
//app.use('/plugins/', controller.plugins);
//app.use('/test/', controller.test);
//app.use('/', controller.index);

server.listen(process.env.PORT || 3000);

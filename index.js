var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
app.use(express.static(__dirname));

var game = require('./game.js')(io);


// Routing
io.on('connection', function (socket) {
  
  var type = game.join(socket);
  socket.emit('player', type);
  
  socket.on('click', function(data){
    console.log('click', data);
  });
  socket.on('disconnect', function () { });
});


setInterval(function(){
  var pos = {
    left: parseInt(Math.random() * 100),
    top: parseInt(Math.random() * 100)
  };
  console.log(pos);
  
  io.sockets.emit('update', {
    move: {
      one: pos
    }
  });
  
}, 1000);


//app.use('/documentation/', controller.documentation);
//app.use('/plugins/:name', controller.plugins);
//app.use('/plugins/', controller.plugins);
//app.use('/test/', controller.test);
//app.use('/', controller.index);

server.listen(process.env.PORT || 3000);

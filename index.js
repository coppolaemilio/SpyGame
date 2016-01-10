var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);


app.use(express.static(__dirname));

// Routing
io.on('connection', function (socket) {
  socket.on('click', function(data){
    console.log('click', data);
  });
  socket.on('disconnect', function () { });
});

//app.use('/documentation/', controller.documentation);
//app.use('/plugins/:name', controller.plugins);
//app.use('/plugins/', controller.plugins);
//app.use('/test/', controller.test);
//app.use('/', controller.index);

server.listen(process.env.PORT || 3000);

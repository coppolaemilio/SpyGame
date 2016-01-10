var io = require('socket.io')(80);
var express = require('express');
//var controller = require('./web/controller');
var app = express();

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


app.listen(process.env.PORT || 3000);

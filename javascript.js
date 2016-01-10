var socket = io();

$("#scene").click(function(e){
  var pos = { x: event.pageX, y: event.pageY };
  
  if (player.is('sniper')) {
    socket.emit('shot', pos);
  } else {
    socket.emit('move', pos);
  }
});

socket.on('update', function(msg){
  data.move.forEach(function(){
    
  });
});

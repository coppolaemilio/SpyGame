var socket = io();

$("#scene").click(function(e){
  var pos = { x: event.pageX, y: event.pageY };
  
  if (player.is('sniper')) {
    socket.emit('shot', pos);
  } else {
    socket.emit('move', pos);
  }
});

function update(data){
  
  console.log(data);
  
  for(var key in data.move) {
    var move = data.move[key];
    $("." + key).offset(move.x, move.y);
  }
}


socket.on('update', update);

update({ move: { one: {x: 5, y: 10}}});

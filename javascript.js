var socket = io();

$("#scene").click(function(e){
  var pos = { x: event.pageX, y: event.pageY };
  
  // if (player.is('sniper')) {
  //   socket.emit('shot', pos);
  // } else {
  //   socket.emit('move', pos);
  // }
});

function update(data){
  
  for(var key in data.move) {
    var move = data.move[key];
    console.log(key);
    $("." + key).offset(move);
  }
  
  $("player").each(function() {
    $(this).css("z-index", $(this).css("top").replace("px",""));
  });
}


socket.on('update', update);

setInterval(function(){
  update({
    move: {
      one: { left: Math.random() * 100, top: Math.random() * 100 }
    }
  });
}, 1000);

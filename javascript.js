var socket = io();

$("#scene").click(function(e){
  var pos = { x: e.pageX, y: e.pageY };
  console.log(pos);
  socket.emit('click', pos);
});

function update(data){
  
  for(var key in data.move) {
    var move = data.move[key];
    $("." + key).offset(move)
      .css("z-index", move.top);
  }
}

socket.on('update', update);

setInterval(function(){
  update({
    move: {
      one: {
        left: parseInt(Math.random() * 100),
        top: parseInt(Math.random() * 100)
      }
    }
  });
}, 1000);

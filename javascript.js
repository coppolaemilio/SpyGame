var socket = io();

$("#scene").click(function(e){
  var pos = {
    left: e.pageX - $(this).offset().left,
    top: e.pageY - $(this).offset().top
  };
  socket.emit('click', pos);
});

function update(data){
  
  for(var key in data.move) {
    var move = data.move[key];
    $("." + key).css(move)
      .css("z-index", move.top);
  }
}

socket.on('update', update);

var socket = io();

$("#scene").click(function(e){
  var data = {
    position: {
      left: e.pageX - $(this).offset().left,
      right: e.pageY - $(this).offset().top
    },
    element: $(e.target).attr('class')
  };
  socket.emit('click', data);
  new Audio('./sfx/shoot.mp3').play();
});

function update(data){
  
  for(var key in data.move) {
    var move = data.move[key];
    $("." + key).css(move)
      .css("z-index", move.top);
  }
}

socket.on('update', update);

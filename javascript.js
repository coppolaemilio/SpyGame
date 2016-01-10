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
});

function update(data){
  
  for(var key in data.move) {
    var move = data.move[key];
    $("." + key).css(move)
      .css("z-index", move.top);
  }
}

socket.on('update', update);

socket.on('player', function(type){
  $("#scene").addClass(type);
});

var text = "";
function updateMessage(text){
  var index = 0;
  $('#messages').html(" ");
  var loop = setInterval(function () {
    $('#messages').append(text[index]);
    index += 1;
    if (index == text.length) {
        clearInterval(loop);
    }
  }, 50);
}
updateMessage("hola!");
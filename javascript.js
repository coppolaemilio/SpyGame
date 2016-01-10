var socket = io();

// Audio files
var shoot = new Audio('/sfx/shoot.mp3');
var reload = new Audio('/sfx/reload.mp3');

shoot.addEventListener("ended", function() {
    shoot.currentTime = 0;
    reload.play();
});

$("#scene").click(function(e){
  var data = {
    position: {
      left: e.pageX - $(this).offset().left,
      top: e.pageY - $(this).offset().top
    },
    element: $(e.target).attr('class')
  };
  socket.emit('click', data);

  // Play shooting sound
  // shoot.play();
});

function update(data){
  for(var key in data.move) {
    var move = data.move[key];
    var pos = { left: move.x, top: move.y };
    $("." + key).css(pos)
      .css("z-index", parseInt(pos.top));
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

socket.on('text', function(text){
  updateMessage(text);
});
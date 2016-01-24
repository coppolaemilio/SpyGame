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

  // Colliding with top wall
  if (data.position.top < 193 ){
    data.position.top = 193.1
  }
  
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

function updateMessage(t){
  $('#messages').html(t);
}

socket.on('text', function(t){
  updateMessage(t);
});
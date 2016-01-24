var socket = io();

// Audio files
var shoot = new Audio('/sfx/shoot.mp3');
var reload = new Audio('/sfx/reload.mp3');

shoot.addEventListener("ended", function() {
    shoot.currentTime = 0;
    reload.play();
});


$("#scene").click(function(e){
  if ($(this).attr("class", "npc")){
    var player_number = $(this).attr("player");
    if (e.pageX > $("player").offset().left){
      $("player." + player_number ).css("transform","translate(-44px, -101px) scale(1, 1)");
    } else {
      $("player." + player_number ).css("transform","translate(-44px, -101px) scale(-1, 1)");
    }
  }
  console.log($(e.target).attr('class'));
  var data = {
    position: {
      left: e.pageX - $(this).offset().left,
      top: e.pageY - $(this).offset().top
    },
    element: $(e.target).attr('class')
  };

  /*
    Not allowing the player to collide
    with the walls.
  */
  // top wall
  if (data.position.top < 193 ){
    data.position.top = 193;
  }
  // sides
  for (i = 0; i < 267; i++) { 
    if (Math.floor(data.position.top) == i + 193 ){
      // left
      if (data.position.left < 144 - (i * 0.5)){
        data.position.left = 144 - (i * 0.5);
      }
      // right
      if (data.position.left > 648 + (i * 0.5)){
        data.position.left = 648 + (i * 0.5);
      }
    }
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

socket.on('player', function(player){
  $("#scene").addClass(player.type);
  var c;
  if ( player.number == 1 ) { c = "one" }
  if ( player.number == 2 ) { c = "two" }
  if ( player.number == 3 ) { c = "three" }
  $("#scene").attr("player", c);
});

function updateMessage(t){
  $('#messages').html(t);
}

socket.on('text', function(t){
  updateMessage(t);
});
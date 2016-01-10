$("#scene").click(function(){
  server.send('');
});
<script src="/socket.io/socket.io.js"></script>


function update(data){
  
}

var socket = io();
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
var io;

function Game(){
  this.players = [];
}

Game.prototype.join = function(player){
  var keys = Object.keys(io.engine.clients);
  
  console.log();
  console.log(player + ' joined the party');
  var type = player === 1 ? 'sniper' : 'npc';
  this.players.push('sniper');
  return type;
};

module.exports = function(i){
  io = i;
  return new Game();
};

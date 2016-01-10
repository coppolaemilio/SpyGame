
function Game(){
  this.players = [];
}

Game.prototype.join = function(player){
  var type = player === 0 ? 'sniper' : 'npc';
  this.players.push('sniper');
  return type;
};

module.exports = function(){ new Game(); };

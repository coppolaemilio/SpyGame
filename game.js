function Game(io){
  this.io = io;
  this.players = [];
}

Game.prototype.join = function(id){
  var keys = Object.keys(this.io.engine.clients);
  var type = keys.length === 1 ? 'sniper' : 'npc';
  this.players.push(id);
  console.log(this.players);
  return type;
};

Game.prototype.click = function(id){
  this.end(this.players[0] === id);
}

Game.prototype.remove = function (id){
  console.log("Left: ", id, this.players);
  console.log(this.players[0], id);
  this.end(this.players[0] === id);
};

Game.prototype.end = function(sniper){
  console.log("Game ended");
  console.log(sniper ? 'Sniper won' : 'NPC won');
}

module.exports = function(io){
  return new Game(io);
};

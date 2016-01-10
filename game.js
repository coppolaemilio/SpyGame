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

Game.prototype.remove = function (id) {
  this.players = this.players.filter(function(i){
    return i !== id;
  });
};

module.exports = function(io){
  return new Game(io);
};

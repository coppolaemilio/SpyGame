var Player = require('./player');

function Game(io){
  this.io = io;
  this.players = [];
}

Game.prototype.start = function(){
  var self = this;
  
  setInterval(function(){
    
    var pos = function(){
      return {
        left: parseInt(Math.random() * 100),
        top: parseInt(Math.random() * 100)
      }
    };
    
    if (self.players.length) {
      var data = {
        move: {
          one: self.players[0].update(),
          two: self.players[1] ? self.players[1].update() : 0,
          three: self.players[2] ? self.players[2].update() : 0,
          four: self.players[3] ? self.players[3].update() : 0
        }
      };
    console.log(data);
    self.io.sockets.emit('update', data);
    }
    
  }, 33);
}

Game.prototype.join = function(player){
  var keys = Object.keys(this.io.engine.clients);
  player.type = keys.length === 1 ? 'sniper' : 'npc';
  if (player.type == 'npc') {
    player.number = Math.random() < 0.33 ? 'one' : Math.random() > 0.66 ? 'thwo' : 'three';
  }
  this.players.push(player);
};

Game.prototype.click = function(id){
  
  this.end(this.players[0].id(id));
}

Game.prototype.remove = function (player){
  this.players = this.players.filter(function(p){
    return p != player;
  });
  console.log("Left: ", player);
};

Game.prototype.end = function(type){
  console.log("Game finished, " + type + ' won');
}

module.exports = Game;

function Player(id, type){
  this.id = id;
  this.type = type;
  this.pos = { x: 400, y: 230 };
  this.to = { x: 0, y: 0 };
  this.speed = (0.1 + Math.random()) * 20;
}

Player.prototype.id = function(id){
  return this.id === id;
}

Player.prototype.is = function(type){
  return this.type === type;
}

Player.prototype.goTo = function(to){
  this.to = to;
}

Player.prototype.update = function(){
  
  // Real NPC stuff
  // if (this.to.x == this.pos.x && this.to.y == this.pos.y) {
  //   goTo({ x: Math.random() * 800, y: Math.random() * 480 });
  // }
  
  var to = this.to;
  var pos = this.pos;
  
  var diff = { x: to.x - pos.x, y: to.y - pos.y };
  var mod = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
  var vec = { x: diff.x / mod, y: diff.y / mod };
  var move = { x: this.speed * vec.x, y: this.speed * vec.y };
  
  console.log("POSA:", pos, to);
  
  if (Math.abs(diff.x) > this.speed){
    pos.x += move.x;
  }
  
  if (Math.abs(diff.y) > this.speed){
    pos.y += move.y;
  }
  
  console.log("POSB:", pos, to);
  this.pos = pos;
  return this.pos;
}

module.exports = Player;
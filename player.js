function Player(id, type){
  this.id = id;
  this.type = type;
  this.pos = { x: 400, y: 230 };
  this.to = { x: 0, y: 0 };
  var speed = 1 + Math.random() * 2;
  this.speed = { x: speed, y: speed / 2 };
}

Player.prototype.id = function(id){
  return this.id === id;
}

Player.prototype.is = function(type){
  return this.type === type;
}

Player.prototype.goTo = function(x, y){
  this.to.x = x;
  this.to.y = y;
}

Player.prototype.update = function(){
  
  var pos = this.pos;
  
  if (this.to.x == pos.x && this.to.y == pos.y) {
    goTo(Math.random() * 800, Math.random() * 480);
  }
  
  var to = this.to;
  
  
  var diff = { x: to.x - pos.x, y: to.y - pos.y };
  
  if (diff.x > this.speed.x){
    pos.x += this.speed.x;
  } else if (diff.x < -this.speed.x) {
    pos.x -= this.speed.x;
  }
  
  if (diff.y > this.speed.y){
    pos.y += this.speed.y;
  } else if (diff.y < -this.speed.y) {
    pos.y -= this.speed.y;
  }
  
  return pos;
}

module.exports = Player;


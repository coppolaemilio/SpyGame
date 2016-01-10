function Player(id, type){
  this.id = id;
  this.type = type;
  this.pos = { x: 400, y: 230 };
  this.to = { x: 0, y: 0 };
  this.speed = 1 + Math.random() * 2;
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
  
  if (this.to.x == this.x) this.x = Math.random() * 800;
  if (this.to.y == this.y) this.y = Math.random() * 480;
  
  return {
    x: this.pos.x + (this.to.x - this.pos.x) > 0 ? this.speed : -this.speed,
    y: this.pos.y + (this.to.y - this.pos.y) > 0 ? this.speed : -this.speed
  };
}

module.exports = Player;


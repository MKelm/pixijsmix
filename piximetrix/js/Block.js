Metrix.Block = function(parent, size) {
  this.parent = parent;
  this.size = size;
  this.position = {
    column: -1,
    row: -1
  };
  
  this.gfx = new PIXI.Graphics();
  this.gfx.visible = false;
  
  this.colorIdx = -1;
  this.colors = [
    0xFF6900, // orange
    0xCA0312, // red
    0x179200, // green
    0xFFED3F, // yellow
    0x3F41FF, // blue
    0xFF3F87 // violet
  ];
};

Metrix.Block.prototype.constructor = Metrix.Block;

Metrix.Block.prototype.setRandomColor = function() {
  this.colorIdx = Math.round(Math.random() * (this.colors.length - 1));  
};

Metrix.Block.prototype.setPosition = function(column, row) {
  this.position.column = column;
  this.position.row = row;
  this.gfx.position.x = window.innerWidth / 2 - this.size * this.parent.columns / 2 + column * this.size;
  this.gfx.position.y = row * this.size;
};

Metrix.Block.prototype.addGfx = function() {
  this.gfx.beginFill(this.colors[this.colorIdx], 1);
  this.gfx.drawRect(
    this.parent.pixi.screenScale * 0.5, this.parent.pixi.screenScale * 0.5,
    this.size - this.parent.pixi.screenScale, this.size - this.parent.pixi.screenScale
  );
  this.parent.container.addChild(this.gfx);
};

Metrix.Block.prototype.removeGfx = function() {
  this.parent.container.removeChild(this.gfx);
};

Metrix.Block.prototype.isVisible = function() {
  return this.gfx.visible;
};

Metrix.Block.prototype.show = function() {
  this.gfx.visible = true;
};

Metrix.Block.prototype.hide = function() {
  this.gfx.visible = false;
};

Metrix.Block.prototype.moveDown = function() {
  this.setPosition(this.position.column, this.position.row+1);
};

Metrix.Block.prototype.moveRight = function() {
  this.setPosition(this.position.column+1, this.position.row);
};

Metrix.Block.prototype.moveLeft = function() {
  this.setPosition(this.position.column-1, this.position.row);
};

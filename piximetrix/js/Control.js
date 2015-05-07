Metrix.Control = function(parent) {
  this.parent = parent;
};

Metrix.Control.prototype.constructor = Metrix.Control;

Metrix.Control.prototype.setKeyEvents = function() {
  var scope = this.parent;
  document.addEventListener("keydown", 
    function(e) {
      if (e.keyCode == 40) {
        var blockIndex = scope.grid.setFieldDown();
        if (blockIndex > -1)
          scope.blocks[blockIndex].moveDown();
      } else if (e.keyCode == 39) {
        var blockIndex = scope.grid.setFieldRight();
        if (blockIndex > -1)
          scope.blocks[blockIndex].moveRight();
      } else if (e.keyCode == 37) {
        var blockIndex = scope.grid.setFieldLeft();
        if (blockIndex > -1)
          scope.blocks[blockIndex].moveLeft();
      }
    }, false);
};

Metrix.Control.prototype.onButtonDown = function(scope, data) {  
  // calculate current falling block gfx position to get difference to button down position
  var blockField = scope.parent.grid.movementField;
  var blockIdx = scope.parent.grid.fields[blockField.column][blockField.row];
  var blockGfxPosX = scope.parent.blocks[blockIdx].gfx.position.x;
  var blockGfxPosY = scope.parent.blocks[blockIdx].gfx.position.y;
  var blockSize = scope.parent.blocks[blockIdx].size;
  
  // get click location in relation to block position / size
  if (data.data.global.x < blockGfxPosX) {
    var blockIndex = scope.parent.grid.setFieldLeft();
    if (blockIndex > -1)
      scope.parent.blocks[blockIndex].moveLeft();
      
  } else if (data.data.global.x > blockGfxPosX + blockSize) {
    var blockIndex = scope.parent.grid.setFieldRight();
    if (blockIndex > -1)
      scope.parent.blocks[blockIndex].moveRight();
      
  } else if (data.data.global.y >= blockGfxPosY + blockSize) {
    var blockIndex = scope.parent.grid.setFieldDown();
    if (blockIndex > -1)
      scope.parent.blocks[blockIndex].moveDown();
  }
};

Metrix.Control.prototype.setButtonEvents = function() {
  this.parent.container.interactive = true;
  var scope = this;
  this.parent.container
    .on('mousedown', function(data) { scope.onButtonDown(scope, data); })
    .on('touchstart', function(data) { scope.onButtonDown(scope, data); })
};

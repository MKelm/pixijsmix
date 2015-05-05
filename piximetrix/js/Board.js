Metrix.Board = function(pixi) {
  this.pixi = pixi;
  this.updateTime = 1000;

  // columns / rows
  this.columns = 8;
  this.rows = 12;

  // blocks[columns][rows]
  this.blockSize = this.pixi.screenScale * 100 / this.rows;
  this.blocks = new Array(this.columns * this.rows);
  for (var i = 0; i < this.columns; i++) {
    this.blocks[i] = new Metrix.Block(this, this.blockSize);
  }
  this.blocksMaxIndex = -1;
  
  // grid to manage blocks in fields
  this.grid = new Metrix.Grid(this, this.columns, this.rows);
};

Metrix.Board.prototype.constructor = Metrix.Board;

Metrix.Board.prototype.initialize = function() {

  // set board grid and col / row size
  var gridGfx = new PIXI.Graphics();
  var gridGfxHeight = this.pixi.screenScale * 100;
  var gridGfxWidth = gridGfxHeight / this.rows * this.columns;

  var gridStartX = window.innerWidth / 2 - gridGfxWidth / 2;
  var gridStartY = window.innerHeight / 2 - gridGfxHeight / 2;

  // set grid background
  gridGfx.beginFill(0xFFFFFF, 1);
  gridGfx.drawRect(
    gridStartX, gridStartY,
    gridGfxWidth, gridGfxHeight
  );

  // set grid lines
  gridGfx.lineStyle(this.pixi.screenScale * 0.5, 0x353535, 1);
  for (var gCol = 0; gCol < this.columns; gCol++) {
    gridGfx.moveTo(gridStartX + gCol * this.blockSize, gridStartY);
    gridGfx.lineTo(
      gridStartX + gCol * this.blockSize,
      gridStartY + this.blockSize * this.rows
    );
  }
  for (var gRow = 0; gRow < this.rows + 1; gRow++) {
    gridGfx.moveTo(gridStartX, gridStartY + gRow * this.blockSize);
    gridGfx.lineTo(
      gridStartX + this.columns * this.blockSize,
      gridStartY + gRow * this.blockSize
    );
  }

  this.pixi.stage.addChild(gridGfx);
};

Metrix.Board.prototype.addRandomBlock = function() {
  var blockRandColumn = Math.round(Math.random() * (this.columns - 1));
  this.addBlock(blockRandColumn, 0);
};

Metrix.Board.prototype.addBlock = function(column, row) {
  this.blocksMaxIndex++;
  this.blocks[this.blocksMaxIndex].setPosition(column, row);
  this.blocks[this.blocksMaxIndex].setRandomColor();
  this.blocks[this.blocksMaxIndex].setGfx();
  this.blocks[this.blocksMaxIndex].show();
  // register block as grid field
  this.grid.setBlockIndex(column, row, this.blocksMaxIndex);
  this.grid.setMovementField(column, row); // every new block is located in a movement field
};

Metrix.Board.prototype.moveBlocks = function(enableMovement) {
  if (enableMovement === true) {
    for (var i = 0; i < this.grid.columns; i++) {
      // scan from bottom to top to avoid extra movements
      for (var j = this.grid.rows - 1; j > -1; j--) {
        var blockIndex = this.grid.setFieldDown(i, j);
        if (blockIndex > -1) {
          this.blocks[blockIndex].moveDown();
        } else if (this.grid.isMovementField(i, j) == true) {
          enableMovement = false;
        }
      }
    }
  } 
  if (enableMovement !== true)
    this.addRandomBlock();
  var scope = this;
  setTimeout(function() { scope.moveBlocks(true); }, scope.updateTime);
};

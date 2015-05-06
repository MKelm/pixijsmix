Metrix.Board = function(pixi) {
  this.pixi = pixi;
  this.updateTime = 1000;

  // columns / rows
  this.columns = 8;
  this.rows = 12;

  // blocks[columns][rows]
  this.blockSize = this.pixi.screenScale * 100 / this.rows;
  this.blocks = new Array(this.columns * this.rows);
  for (var i = 0; i < this.columns * this.rows; i++) {
    this.blocks[i] = new Metrix.Block(this, this.blockSize);
  }
  this.blocksMaxIndex = -1;

  // use a board container to manage blocks and grid content on one layer
  this.container = new PIXI.Container();
  this.pixi.stage.addChild(this.container);
  
  // grid to manage blocks in fields
  this.grid = new Metrix.Grid(this, this.columns, this.rows);
  this.grid.addGfx();
  
  // add default text elements
  this.pointsText = new Metrix.Text(this, "Points: 0", 1, 12, "left");
  this.credits = new Metrix.Text(this, "idx.codelab", 9, 12, "right");
  
};

Metrix.Board.prototype.constructor = Metrix.Board;

Metrix.Board.prototype.addRandomBlock = function() {
  var blockRandColumn = Math.round(Math.random() * (this.columns - 1));
  this.addBlock(blockRandColumn, 0);
};

Metrix.Board.prototype.addBlock = function(column, row) {
  this.blocksMaxIndex += 1;
  this.blocks[this.blocksMaxIndex].setPosition(column, row);
  this.blocks[this.blocksMaxIndex].setRandomColor();
  this.blocks[this.blocksMaxIndex].addGfx();
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

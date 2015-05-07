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
  this.points = 0;
  this.pointsPrefixText = "Points: ";
  this.pointsText = new Metrix.Text(this, this.pointsPrefixText + this.points, 1, 12, "left");
  this.credits = new Metrix.Text(this, "idx.codelab", 9, 12, "right");
  
};

Metrix.Board.prototype.constructor = Metrix.Board;

Metrix.Board.prototype.addRandomBlock = function() {
  var loopCount = 0;
  var added = false;
  do {
    var blockRandColumn = Math.round(Math.random() * (this.grid.columns - 1));
    added = this.addBlock(blockRandColumn, 0);
    loopCount++;
  } while (loopCount < 100 && added === false);
  return added;
};

Metrix.Board.prototype.addBlock = function(column, row) {
  var blockIndex = this.grid.getBlockIndex(column, row);
  if (blockIndex == -1) {
    this.blocksMaxIndex += 1;
    this.blocks[this.blocksMaxIndex].setPosition(column, row);
    this.blocks[this.blocksMaxIndex].setRandomColor();
    this.blocks[this.blocksMaxIndex].addGfx();
    this.blocks[this.blocksMaxIndex].show();
    // register block as grid field
    this.grid.setBlockIndex(column, row, this.blocksMaxIndex);
    this.grid.setMovementField(column, row); // every new block is located in a movement field
    return true;
  }
  return false;
};

Metrix.Board.prototype.addPoints = function(pointsToAdd) {
  this.points += pointsToAdd;
  this.pointsText.setText(this.pointsPrefixText + this.points);
};

Metrix.Board.prototype.moveBlocks = function(enableMovement) {
  if (enableMovement === true) {
    for (var i = 0; i < this.grid.columns; i++) {
      // scan from bottom to top to avoid extra movements
      for (var j = this.grid.rows - 1; j > -1; j--) {
        var blockIndex = this.grid.setSelectedFieldDown(i, j);
        if (blockIndex > -1) {
          this.blocks[blockIndex].moveDown();
          this.grid.countFields(i, j+1);
          
        } else if (this.grid.isMovementField(i, j) == true) {
          enableMovement = false;
          //this.addPoints(100);
        }
      }
    }
  } 
  if (enableMovement !== true) {
    if (this.addRandomBlock() === false)
      console.log("game over");
  }
  var scope = this;
  setTimeout(function() { scope.moveBlocks(true); }, scope.updateTime);
};

Metrix.Board.prototype.setControl = function() {
  this.control = new Metrix.Control(this);
  this.control.setKeyEvents();
  this.control.setButtonEvents();
};

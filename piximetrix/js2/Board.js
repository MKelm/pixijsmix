Metrix.Board = function(pixi) {
  this.pixi = pixi;
  this.updateTime = 1000;
  
  // init / set block colors
  var blockColors = [
    0xFF6900, // orange
    0xCA0312, // red
    0x179200, // green
    0xFFED3F, // yellow
    0x3F41FF, // blue
    0xFF3F87 // violet
  ];
  this.blockColorsMaxIndex = blockColors.length - 1;
  this.pixi.linkedGrid.addCellColor(blockColors[0]);
  this.pixi.linkedGrid.addCellColor(blockColors[1]);
  this.pixi.linkedGrid.addCellColor(blockColors[2]);
  this.pixi.linkedGrid.addCellColor(blockColors[3]);
  this.pixi.linkedGrid.addCellColor(blockColors[4]);
  this.pixi.linkedGrid.addCellColor(blockColors[5]);

  // add default text elements
  this.points = 0;
  this.pointsPrefixText = "Points: ";
  this.pointsText = new Metrix.Text(this, this.pointsPrefixText + this.points, 1, 12, "left");
  this.creditsText = new Metrix.Text(this, "idx.codelab", 9, 12, "right");
  
  var scope = this;
  window.addEventListener('resize', function(event) {
    scope.pointsText.setTextPosition();
    scope.creditsText.setTextPosition();
  });
  
};

Metrix.Board.prototype.constructor = Metrix.Board;

Metrix.Board.prototype.addRandomBlock = function() {
  var loopCount = 0;
  var added = false;
  do {
    var blockRandColumn = Math.round(Math.random() * (this.pixi.linkedGrid.columns - 1));
    var blockRandColor = Math.round(Math.random() * this.blockColorsMaxIndex);
    added = this.pixi.linkedGrid.addCell(blockRandColumn, 0, blockRandColor);
    loopCount++;
  } while (loopCount < 100 && added === false);
  return added;
};

Metrix.Board.prototype.addPoints = function(pointsToAdd) {
  this.points += pointsToAdd;
  this.pointsText.setText(this.pointsPrefixText + this.points);
};

Metrix.Board.prototype.moveBlocks = function(enableMovement) {
  // TODO TODO TODO
  /*if (enableMovement === true) {
    this.grid.resetCheckStatus();
    for (var i = 0; i < this.grid.columns; i++) {
      // scan from bottom to top to avoid extra movements
      for (var j = this.grid.rows - 1; j > -1; j--) {
        var blockIndex = this.grid.setSelectedFieldDown(i, j);
        if (blockIndex > -1) {
          this.blocks[blockIndex].moveDown();
          
        } else if (this.grid.isFallingField(i, j) == true) {
          // count blocks by field to calculate points
          var fieldCount = this.grid.countFields(i, j);
          if (fieldCount > 3) {
            console.log(fieldCount + " field points available");
            this.addPoints(5 * fieldCount);
            // reset fields in grid to remove blocks
            this.grid.resetFields(i, j);
          }
        }
      }
    }
  } 
  // check for movement field in grid
  if (enableMovement == false || this.grid.hasMovementField() === false) {
    if (this.addRandomBlock() === false)
      console.log("game over");
  }
  var scope = this;
  setTimeout(function() { scope.moveBlocks(true); }, scope.updateTime);*/
};

Metrix.Board.prototype.setControl = function() {
  /*this.control = new Metrix.Control(this);
  this.control.setKeyEvents();
  this.control.setButtonEvents();*/
};

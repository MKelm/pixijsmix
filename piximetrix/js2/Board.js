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
  
  this.pointsText = new ScaledGridText(this.pixi.stage, this.pixi.linkedGrid, false);
  this.pointsText.setText(this.pointsPrefixText + this.points);
  this.pointsText.setPosition("bottom", "left", 10, 10);
  
  this.creditsText = new ScaledGridText(this.pixi.stage, this.pixi.linkedGrid, false);
  this.creditsText.setText("idx.codelab");
  this.creditsText.setPosition("bottom", "right", 10, 10);
  
  var scope = this;
  window.addEventListener('resize', function(event) {
    scope.pointsText.resize(scope.pixi.linkedGrid);
    scope.creditsText.resize(scope.pixi.linkedGrid);
  });
  
  this.moveableGridCell = {
    column: -1,
    row: -1
  };
  
};

Metrix.Board.prototype.constructor = Metrix.Board;

Metrix.Board.prototype.addRandomBlock = function() {
  var loopCount = 0;
  var added = false;
  this.moveableGridCell.column = -1;
  this.moveableGridCell.row = -1;
  do {
    var blockRandColumn = Math.round(Math.random() * (this.pixi.linkedGrid.columns - 1));
    var blockRandColor = Math.round(Math.random() * this.blockColorsMaxIndex);
    added = this.pixi.linkedGrid.addCell(blockRandColumn, 0, blockRandColor);
    loopCount++;
  } while (loopCount < 100 && added === false);
  if (added === true) {
    this.moveableGridCell.column = blockRandColumn;
    this.moveableGridCell.row = 0;
  }
  return added;
};

Metrix.Board.prototype.addPoints = function(pointsToAdd) {
  this.points += pointsToAdd;
  this.pointsText.setText(this.pointsPrefixText + this.points);
  this.pointsText.setPosition("bottom", "left", 10, 10);
};

Metrix.Board.prototype.moveBlocks = function(enableMovement) {
  // TODO TODO TODO
  if (enableMovement === true) {
    var moved = false;
    if (this.pixi.linkedGrid.moveCell(
          this.moveableGridCell.column, this.moveableGridCell.row, 
          this.moveableGridCell.column, this.moveableGridCell.row+1
        ) === true) {
      this.moveableGridCell.row++;
      var cellsCount = this.pixi.linkedGrid.countCellsByField(
        this.moveableGridCell.column, this.moveableGridCell.row
      );
      this.pixi.linkedGrid.resetCellsCheckStatus();
      if (cellsCount > 1) {
        this.addPoints(5 * cellsCount);
        this.pixi.linkedGrid.countCellsByField(
          this.moveableGridCell.column, this.moveableGridCell.row, true
        );
      }
    } else {
      if (this.addRandomBlock() === false)
        console.log("game over");
    }
  }
  var scope = this;
  setTimeout(function() { scope.moveBlocks(true); }, scope.updateTime);
};

Metrix.Board.prototype.setControl = function() {
  /*this.control = new Metrix.Control(this);
  this.control.setKeyEvents();
  this.control.setButtonEvents();*/
};

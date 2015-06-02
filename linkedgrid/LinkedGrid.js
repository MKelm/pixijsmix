LinkedGrid = function(columns, rows, debug) {
  this.debug = debug | false;

  this.columns = columns;
  this.rows = rows;
  
  this.colors = [];
  
  this.cells = [columns * rows]; // array with cell objects
  this.maxCellIndex = -1; // max used cell index
  this.field = [columns][rows]; // 2d array with cell references
};

LinkedGrid.prototype.constructor = LinkedGrid;

LinkedGrid.prototype.setSize = function(columns, rows) {
  this.columns = columns;
  this.rows = rows;
};

LinkedGrid.prototype.addCellColor = function(color) {
  this.colors.push(color);
  return this.colors.length - 1;
};

LinkedGrid.prototype.addCell = function(column, row, colorIndex) {
  // we need a free place in the cells array
  if (this.maxCellIndex < this.cells.length) {
    console.log("free place in cells array");
  
  } else if (debug == true) {
    console.log("no free place in cells array");
  }
};

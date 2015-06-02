LinkedGrid = function(columns, rows, debug) {
  this.debug = debug | false;

  this.columns = columns;
  this.rows = rows;
  
  this.colors = [];
  
  this.cells = new Array(this.columns * this.rows); // array with cell objects
  for (var i = 0; i < this.columns * this.rows; i++) {
    this.cells[i] = null;
  }
  this.maxCellIndex = -1; // maximal used cell index
  
  this.field = new Array(this.columns); // 2d array with cell references
  for (var column = 0; column < columns; column++) {
    this.field[column] = new Array(this.rows);
    for (var row = 0; row < rows; row++) {
      this.field[column][row] = null;
    }
  }
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
  if (this.maxCellIndex < this.cells.length && this.field[column][row] === null) {
    if (this.debug == true)
      console.log("free place in cells array to add");
    
    this.cells[this.maxCellIndex] = {
      gfx: "reference todo",
      column: column,
      row: row,
      colorIndex: colorIndex
    };
    this.field[column][row] = this.cells[this.maxCellIndex];
    this.maxCellIndex++;
    
    return true;
  } else if (this.debug == true) {
    console.log("no free place in cells array to add");
  }
  return false;
};

LinkedGrid.prototype.removeCell = function(column, row) {
  // we need a field cell which is set
  if (this.maxCellIndex > -1 && this.field[column][row] !== null) {
    if (this.debug == true)
      console.log("valid place in cells array to remove");
    
    this.field[column][row] = null;
    // todo remove pixi.js gfx object
    // todo remove cell object
    
    return true;
  } else if (this.debug == true) {
    console.log("invalid place in cells array to remove");
  }
  return false;
};

LinkedGrid.prototype.moveCell = function(sColumn, sRow, tColumn, tRow) {
  // we have to determine if the source cell is not set and the target cell is free
  console.log(this.field[sColumn][sRow], this.field[tColumn][tRow]);
};

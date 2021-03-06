LinkedGrid = function(container, columns, rows, maxWidth, maxHeight, debug) {
  this.debug = debug | false;
  
  this.container = container; // a display container to add gfx elements to

  this.setSize(columns, rows, maxWidth, maxHeight);
  
  this.colors = [];
  
  this.cells = new Array(this.columns * this.rows); // array with cell objects
  for (var i = 0; i < this.columns * this.rows; i++) {
    this.cells[i] = null;
  }
  this.maxCellIndex = -1; // maximal used cell index
  
  this.field = new Array(this.columns); // 2d array with cell references
  for (var column = 0; column < this.columns; column++) {
    this.field[column] = new Array(this.rows);
    for (var row = 0; row < rows; row++) {
      this.field[column][row] = null;
    }
  }
};

LinkedGrid.prototype.constructor = LinkedGrid;

LinkedGrid.prototype.setSize = function(columns, rows, maxWidth, maxHeight) {
  // max/full width of display container
  this.maxWidth = maxWidth;
  this.maxHeight = maxHeight;
  
  // grid size by columns/rows
  this.columns = columns;
  this.rows = rows;
  
  // calculate cell size / margin depending on grid size and cell amount
  this.cellWidth = 0;
  this.cellHeight = 0;
  this.cellMarginTop = 0;
  this.cellMarginLeft = 0;
  if (this.rows > this.columns) {
    // calculate cell size to get correct cell proportions
    if (this.maxWidth < this.maxHeight) {
      this.cellWidth = this.maxWidth / this.columns;
      this.cellHeight = this.maxWidth / this.columns;
      // calculate cell margin to center grid cells
      this.cellMarginTop = (this.maxHeight - this.cellHeight * this.rows) / 2;
    } else {
      this.cellWidth = this.maxHeight / this.rows;
      this.cellHeight = this.maxHeight / this.rows;
      // calculate cell margin to center grid cells
      this.cellMarginLeft = (this.maxWidth - this.cellWidth * this.columns) / 2;
    }
  } else if (this.rows < this.columns) {
    // calculate cell size to get correct cell proportions
    if (this.maxWidth > this.maxHeight) {
      this.cellWidth = this.maxHeight / this.rows;
      this.cellHeight = this.maxHeight / this.rows;
      // calculate cell margin to center grid cells
      this.cellMarginLeft = (this.maxWidth - this.cellWidth * this.columns) / 2;
    } else {
      this.cellWidth = this.maxWidth / this.columns;
      this.cellHeight = this.maxWidth / this.columns;
      // calculate cell margin to center grid cells
      this.cellMarginTop = (this.maxHeight - this.cellHeight * this.rows) / 2;
    }
  } else if (this.rows == this.columns) {
    // calculate cell size to get correct cell proportions
    if (this.maxWidth < this.maxHeight) {
      this.cellWidth = this.maxWidth / this.columns;
      this.cellHeight = this.maxWidth / this.columns;
    } else {
      this.cellWidth = this.maxHeight / this.columns;
      this.cellHeight = this.maxHeight / this.columns;
    }
    // calculate cell margin to center grid cells
    this.cellMarginLeft = (this.maxWidth - this.cellWidth * this.columns) / 2;
    this.cellMarginTop = (this.maxHeight - this.cellHeight * this.rows) / 2;
  }
  this.width = this.cellWidth * this.columns;
  this.height = this.cellHeight * this.rows;
  
  if (this.debug == true)
    console.log("changed grid size with cell size", this.cellWidth, this.cellHeight);
};

LinkedGrid.prototype.redrawCells = function() {
  // we have to remove all container children and redraw children to get new cells on resize events
  for (var i = 0; i <= this.maxCellIndex; i++) {
    this.container.removeChild(this.cells[i].gfx);
    
    this.cells[i].gfx = new PIXI.Graphics();
    this.cells[i].gfx.beginFill(this.colors[this.cells[i].colorIndex], 1);
    this.cells[i].gfx.drawRect(
      this.cellMarginLeft + this.cells[i].column * this.cellWidth, this.cellMarginTop + this.cells[i].row * this.cellHeight,
      this.cellWidth, this.cellHeight
    );
    this.container.addChild(this.cells[i].gfx);
  }
};

LinkedGrid.prototype.resize = function(maxWidth, maxHeight) {
  if (this.debug == true)
    console.log("resize grid maximal display size", maxWidth, maxHeight);
  this.setSize(this.columns, this.rows, maxWidth, maxHeight);
  this.redrawCells();
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
      
    // prepare gfx to add it to display container
    var gfx = new PIXI.Graphics();
    gfx.beginFill(this.colors[colorIndex], 1);
    gfx.drawRect(
      this.cellMarginLeft + column * this.cellWidth, this.cellMarginTop + row * this.cellHeight,
      this.cellWidth, this.cellHeight
    );
    this.container.addChild(gfx);
    
    this.maxCellIndex++;
    this.cells[this.maxCellIndex] = {
      gfx: gfx,
      column: column,
      row: row,
      colorIndex: colorIndex,
      checkStatus: false
    };
    this.field[column][row] = this.cells[this.maxCellIndex];
    
    if (this.debug == true)
      console.log("added cell with maximal cell index", this.maxCellIndex);
    
    return true;
  } else if (this.debug == true) {
    console.log("no free place in cells array to add");
  }
  return false;
};

LinkedGrid.prototype.resetCellsCheckStatus = function() {
  if (this.maxCellIndex > -1) {
    for (var i = 0; i < this.maxCellIndex; i++) {
      this.cells[i].checkStatus = false;
    }
  }
};

LinkedGrid.prototype.countCellsByFieldRecursive = function(column, row, colorIndex, removeCells) {
  var fieldCount = 0;
  var field = this.field[column][row];
  // check current field and further neighbours
  if (field !== null && field.colorIndex == colorIndex) {
    fieldCount++;
    if (removeCells === true)
      this.removeCell(column, row);
    else 
      field.checkStatus = true;
  
    // check left field neighbour
    if (column > 0 && this.field[column-1][row] !== null && this.field[column-1][row].checkStatus == false) {
      if (removeCells === false)
        this.field[column-1][row].checkStatus = true;
      var leftField = this.field[column-1][row];
      if (leftField !== undefined && leftField.colorIndex == colorIndex) {
        fieldCount += this.countCellsByFieldRecursive(column-1, row, colorIndex, removeCells);
      }
    }
    // check right field neighbour
    if (column+1 < this.columns && this.field[column+1][row] !== null && this.field[column+1][row].checkStatus == false) {
      if (removeCells === false)
        this.field[column+1][row].checkStatus = true;
      var rightField = this.field[column+1][row];
      if (rightField !== undefined && rightField.colorIndex == colorIndex) {
        fieldCount += this.countCellsByFieldRecursive(column+1, row, colorIndex, removeCells);
      }
    }
    // check bottom field neighbour
    if (row+1 < this.rows && this.field[column][row+1] !== null && this.field[column][row+1].checkStatus == false) {
      if (removeCells === false)
        this.field[column][row+1].checkStatus = true;
      var bottomField = this.field[column][row+1];
      if (bottomField !== undefined && bottomField.colorIndex == colorIndex) {
        fieldCount += this.countCellsByFieldRecursive(column, row+1, colorIndex, removeCells);
      }
    }
    // check top field neighbour
    if (row > 0 && this.field[column][row-1] !== null && this.field[column][row-1].checkStatus == false) {
      if (removeCells === false)
        this.field[column][row-1].checkStatus = true;
      var topField = this.field[column][row-1];
      if (topField !== undefined && topField.colorIndex == colorIndex) {
        fieldCount += this.countCellsByFieldRecursive(column, row-1, colorIndex, removeCells);
      }
    }
  }
  return fieldCount;
};

LinkedGrid.prototype.countCellsByField = function(column, row, remove) {
  if (this.maxCellIndex > -1 && this.field[column][row] !== null) {
    var colorIndex = this.field[column][row].colorIndex;
    return this.countCellsByFieldRecursive(column, row, colorIndex, remove || false);
  }
  return false;
};

LinkedGrid.prototype.removeCell = function(column, row) {
  // we need a field cell which is set
  if (this.maxCellIndex > -1 && this.field[column][row] !== null) {
    if (this.debug == true)
      console.log("valid place in cells array to remove");
    
    this.container.removeChild(this.field[column][row].gfx);

    // remove cell object and move all remaining cells by one position to keep cells array length
    for (var i = 0; i <= this.maxCellIndex; i++) {
      if (this.cells[i] == this.field[column][row]) {
        this.field[column][row] = null;
        for (var j = i; j < this.cells.length-1; j++) {
          this.cells[j] = this.cells[j+1];
        }
        this.maxCellIndex--;
        if (this.debug == true) 
          console.log("removed cell object with new maximal cell index", this.maxCellIndex);
        break;
      }
    }
    
    return true;
  } else if (this.debug == true) {
    console.log("invalid place in cells array to remove");
  }
  return false;
};

LinkedGrid.prototype.moveCell = function(sColumn, sRow, tColumn, tRow) {
  // we have to determine if the source cell has been set and the target cell is free
  if (this.maxCellIndex > -1 && this.field[sColumn][sRow] !== null && this.field[tColumn][tRow] === null) {
    if (this.debug == true)
      console.log("move cell from / to", sColumn, sRow, tColumn, tRow);
    var colorIndex = this.field[sColumn][sRow].colorIndex;
    this.removeCell(sColumn, sRow);
    this.addCell(tColumn, tRow, colorIndex);
    return true;
  } else {
    if (this.debug == true)
      console.log("invalid arguments to move cell");
    return false;
  }
};

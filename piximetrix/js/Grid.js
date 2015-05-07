Metrix.Grid = function(parent, columns, rows) {
  this.parent = parent;
  this.columns = columns;
  this.rows = rows;
  
  this.fields = new Array(this.columns);
  for (var i = 0; i < this.columns; i++) {
    this.fields[i] = new Array(this.rows);
    for (var j = 0; j < this.rows; j++) {
      // each field gets one block idx, -1 no block idx number
      this.fields[i][j] = -1;
    }
  }
  
  this.movementField = {
    column: -1,
    row: -1
  };
};

Metrix.Grid.prototype.constructor = Metrix.Grid;

Metrix.Grid.prototype.addGfx = function() {

  // set board grid and col / row size
  var gridGfx = new PIXI.Graphics();
  var gridGfxHeight = this.parent.pixi.screenScale * 100;
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
  gridGfx.lineStyle(this.parent.pixi.screenScale * 0.5, 0x353535, 1);
  for (var gCol = 0; gCol < this.columns + 1; gCol++) {
    gridGfx.moveTo(gridStartX + gCol * this.parent.blockSize, gridStartY);
    gridGfx.lineTo(
      gridStartX + gCol * this.parent.blockSize,
      gridStartY + this.parent.blockSize * this.rows
    );
  }
  for (var gRow = 0; gRow < this.rows + 1; gRow++) {
    gridGfx.moveTo(gridStartX, gridStartY + gRow * this.parent.blockSize);
    gridGfx.lineTo(
      gridStartX + this.columns * this.parent.blockSize,
      gridStartY + gRow * this.parent.blockSize
    );
  }

  this.parent.container.addChild(gridGfx);
};

Metrix.Grid.prototype.setBlockIndex = function(column, row, index) {
  this.fields[column][row] = index;
};

Metrix.Grid.prototype.getBlockIndex = function(column, row) {
  return this.fields[column][row];
};

Metrix.Grid.prototype.setMovementField = function(column, row) {
  this.movementField.column = column;
  this.movementField.row = row;
};

Metrix.Grid.prototype.isMovementField = function(column, row) {
  if (this.movementField.column == column && this.movementField.row == row) 
    return true;
  else
    return false;
};

Metrix.Grid.prototype.isEmptyField = function(column, row) {
  return this.fields[column][row] == -1;
}; 

Metrix.Grid.prototype.setFieldDown = function() {
  return this.setSelectedFieldDown(
    this.movementField.column, this.movementField.row
  );
};

Metrix.Grid.prototype.setSelectedFieldDown = function(column, row) {
  if (row+1 < this.parent.rows && this.fields[column][row+1] == -1) {
    var index = this.fields[column][row];
    if (this.isMovementField(column, row) == true)
      this.setMovementField(column, row+1);
    this.fields[column][row] = -1;
    this.fields[column][row+1] = index;
    return index;
  }
  return -1;
};

Metrix.Grid.prototype.setFieldRight = function() {
  var column = this.movementField.column;
  var row = this.movementField.row;
  if (column < this.columns - 1 && this.fields[column+1][row] == -1) {
    var index = this.fields[column][row];
    this.fields[column][row] = -1;
    this.fields[column+1][row] = index;
    this.setMovementField(column+1, row);
    return index;
  }
  return -1;
};

Metrix.Grid.prototype.setFieldLeft = function() {
  var column = this.movementField.column;
  var row = this.movementField.row;
  if (column > 0 && this.fields[column-1][row] == -1) {
    var index = this.fields[column][row];
    this.fields[column][row] = -1;
    this.fields[column-1][row] = index;
    this.setMovementField(column-1, row);
    return index;
  }
  return -1;
};

Metrix.Grid.prototype.countFields = function(column, row) {
  var colorIdx = this.parent.blocks[this.fields[column][row]].colorIdx;
  console.log("count fields by color "+colorIdx);
};

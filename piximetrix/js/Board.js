Metrix.Board = function(pixi) {
  this.pixi = pixi;

  // grid columns / rows
  this.gridColumns = 8;
  this.gridRows = 12;
  this.gridElementSize = 0; // calc on addGrid

  this.elements = [];
  this.elementColors = [
    0xFF6900, // orange
    0xCA0312, // red
    0x179200, // green
    0xFFED3F, // yellow
    0x3F41FF, // blue
    0xFF3F87 // violet
  ];
};

Metrix.Board.prototype.constructor = Metrix.Board;

Metrix.Board.prototype.addGridElement = function() {
  var elementGfx = new PIXI.Graphics();

  var randPos = Math.round(Math.random() * (this.gridColumns - 1));

  elementGfx.position.x = window.innerWidth / 2 -
    this.gridElementSize * this.gridColumns / 2 + randPos * this.gridElementSize;
  elementGfx.position.y = 0;

  elementGfx.beginFill(this.elementColors[0], 1);
  elementGfx.drawRect(
    this.pixi.screenScale * 0.5, this.pixi.screenScale * 0.5,
    this.gridElementSize - this.pixi.screenScale,
    this.gridElementSize - this.pixi.screenScale
  );

  this.pixi.stage.addChild(elementGfx);
};

Metrix.Board.prototype.addGrid = function() {

  // set board grid and col / row size
  var gridGfx = new PIXI.Graphics();
  var gridGfxHeight = this.pixi.screenScale * 100;
  this.gridElementSize = gridGfxHeight / this.gridRows;
  var gridGfxWidth = this.gridElementSize * this.gridColumns;

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
  for (var gCol = 0; gCol < this.gridColumns; gCol++) {
    gridGfx.moveTo(gridStartX + gCol * this.gridElementSize, gridStartY);
    gridGfx.lineTo(
      gridStartX + gCol * this.gridElementSize,
      gridStartY + this.gridElementSize * this.gridRows
    );
  }
  for (var gRow = 0; gRow < this.gridRows + 1; gRow++) {
    gridGfx.moveTo(gridStartX, gridStartY + gRow * this.gridElementSize);
    gridGfx.lineTo(
      gridStartX + this.gridColumns * this.gridElementSize,
      gridStartY + gRow * this.gridElementSize
    );
  }

  this.pixi.stage.addChild(gridGfx);
};
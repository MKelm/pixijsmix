Metrix.Text = function(parent, text, column, row, align) {
  this.parent = parent;
  
  this.fontSize = 20; // TODO use screen scale
  this.strokeThickness = 5; // TODO use screen scale
  
  this.text = new PIXI.Text(
    text,
    { font: 'bold ' + this.fontSize + 'px Arial', fill: '#FFFFFF', align: 'center',
      stroke: '#353535', strokeThickness: this.strokeThickness }
  );

  if (align == "left") {
    this.text.anchor.set(0, 0.5);
  } else if (align == "right") {
    this.text.anchor.set(1, 0.5);
  } else {
    this.text.anchor.set(0.5, 0.5);
  }
  this.positionColumn = column;
  this.positionRow = row;
  this.setTextPosition();
  
  this.parent.pixi.stage.addChild(this.text);
};

Metrix.Text.prototype.constructor = Metrix.Text;

Metrix.Text.prototype.setTextPosition = function() {
  this.text.position.x = window.innerWidth / 2 - this.parent.pixi.linkedGrid.cellWidth * this.parent.pixi.linkedGrid.columns / 2 + this.parent.pixi.linkedGrid.cellWidth * (this.positionColumn - 1);
  this.text.position.y = (this.positionRow - 1) * this.parent.pixi.linkedGrid.cellWidth + this.parent.pixi.linkedGrid.cellWidth / 2;
};

Metrix.Text.prototype.setInteraction = function() {
  this.text.interactive = true;
  this.text.click = function(){
    alert("click text");
  };
};

Metrix.Text.prototype.setText = function(text) {
  this.text.text = text;
};

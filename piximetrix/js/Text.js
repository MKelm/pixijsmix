Metrix.Text = function(parent, text, column, row, align) {
  this.parent = parent;
  
  this.text = new PIXI.Text(
    text,
    { font: 'bold 20px Arial', fill: '#FFFFFF', align: 'center',
      stroke: '#353535', strokeThickness: 6 }
  );

  if (align == "left") {
    this.text.anchor.set(0, 0.5);
  } else if (align == "right") {
    this.text.anchor.set(1, 0.5);
  } else {
    this.text.anchor.set(0.5, 0.5);
  }
  this.text.position.x = window.innerWidth / 2 - this.parent.blockSize * this.parent.columns / 2 + this.parent.blockSize * (column - 1);
  this.text.position.y = (row - 1) * this.parent.blockSize + this.parent.blockSize / 2;
  
  this.parent.pixi.stage.addChild(this.text);
};

Metrix.Text.prototype.constructor = Metrix.Text;

Metrix.Text.prototype.setInteraction = function() {
  this.text.interactive = true;
  this.text.click = function(){
    alert("click text");
  };
};

Metrix.Text.prototype.setText = function(text) {
  this.text.text = text;
};

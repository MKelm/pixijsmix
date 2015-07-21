ScaledGridText = function(container, grid, debug) {
  // default values
  this.textString = "";
  this.textColor = "#FFFFFF";
  this.textStrokeColor = "#353535";

  this.debug = debug | false;
  this.container = container; // a display container to add text elements to
  
  this.grid = grid;
  this.calcScale(this.grid.width, this.grid.height);
  
  this.setFontSize();
  this.setStrokeThickness();
};

ScaledGridText.prototype.constructor = ScaledGridText;

ScaledGridText.prototype.calcScale = function(frameWidth, frameHeight) {
  this.scale = 500;
  if (frameHeight > frameWidth)
    this.scale = frameHeight / this.scale;
  else
    this.scale = frameWidth / this.scale;
  if (this.debug == true)
    console.log("changed text scale size", this.scale);
};

ScaledGridText.prototype.setFontSize = function(fontSize) {
  this.fontSize = (fontSize || 20) * this.scale;
  if (this.debug == true)
    console.log("changed text font size", this.scale);
};

ScaledGridText.prototype.setStrokeThickness = function(strokeThickness) {
  this.strokeThickness = (strokeThickness || 5) * this.scale;
  if (this.debug == true)
    console.log("changed text stroke thickness", this.scale);
};

ScaledGridText.prototype.setText = function(textString) {
  if (typeof this.text != "undefined") {
    this.container.removeChild(this.text);
  }
  this.textString = textString || this.textString;
  if (this.debug == true)
    console.log("set text to", this.textString);
  this.text = new PIXI.Text(
    this.textString,
    { font: 'bold ' + this.fontSize + 'px Arial', fill: this.textColor, align: 'center',
      stroke: this.textStrokeColor, strokeThickness: this.strokeThickness }
  );
  this.container.addChild(this.text);
};

ScaledGridText.prototype.setPosition = function(positionV, positionH, marginV, marginH) {
  this.positionV = positionV || this.positionV;
  this.positionH = positionH || this.positionH;
  this.marginV = marginV || this.marginV;
  this.marginH = marginH || this.marginH;
  if (this.positionV== "top") {
    this.text.position.y = this.grid.cellMarginTop + this.marginV * this.scale;
    this.text.anchor.y = 0;
  } else if (this.positionV == "bottom") {
    this.text.position.y = this.grid.height + this.grid.cellMarginTop - this.marginV * this.scale;
    this.text.anchor.y = 1;
  } else if (this.positionV == "center") {
    this.text.position.y = this.grid.height / 2 + this.grid.cellMarginTop - this.marginV * this.scale / 2;
    this.text.anchor.y = 0.5;
  }
  if (this.positionH == "left") {
    this.text.position.x = this.grid.cellMarginLeft + this.marginH * this.scale;
    this.text.anchor.x = 0;
  } else if (this.positionH == "right") {
    this.text.position.x = this.grid.width + this.grid.cellMarginLeft - this.marginH * this.scale;
    this.text.anchor.x = 1;
  } else if (this.positionH == "center") {
    this.text.position.x = this.grid.width / 2 + this.grid.cellMarginLeft - this.marginH * this.scale / 2;
    this.text.anchor.x = 0.5;
  }
  if (this.debug == true) 
    console.log("set text position x/y", this.text.position.x, this.text.position.y);
};

ScaledGridText.prototype.setInteraction = function() {
  this.text.interactive = true;
  this.text.click = function(){
    alert("click text");
  };
};

ScaledGridText.prototype.resize = function(grid) {
  this.calcScale(this.grid.width, this.grid.height);
  this.setFontSize();
  this.setStrokeThickness();
  this.setText();
  this.setPosition();
};

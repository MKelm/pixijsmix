ScaledText = function(container, frameWidth, frameHeight, debug) {
  // default values
  this.textString = "";
  this.textColor = "#FFFFFF";
  this.textStrokeColor = "#353535";

  this.debug = debug | false;
  this.container = container; // a display container to add text elements to

  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
  this.calcScale(frameWidth, frameHeight);
  
  this.setFontSize();
  this.setStrokeThickness();
};

ScaledText.prototype.constructor = ScaledText;

ScaledText.prototype.calcScale = function(frameWidth, frameHeight) {
  this.scale = 500;
  if (frameHeight > frameWidth)
    this.scale = frameHeight / this.scale;
  else
    this.scale = frameWidth / this.scale;
  if (this.debug == true)
    console.log("changed text scale size", this.scale);
};

ScaledText.prototype.setFontSize = function(fontSize) {
  this.fontSize = (fontSize || 20) * this.scale;
  if (this.debug == true)
    console.log("changed text font size", this.scale);
};

ScaledText.prototype.setStrokeThickness = function(strokeThickness) {
  this.strokeThickness = (strokeThickness || 5) * this.scale;
  if (this.debug == true)
    console.log("changed text stroke thickness", this.scale);
};

ScaledText.prototype.setText = function(textString) {
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

ScaledText.prototype.setPosition = function(positionV, positionH, marginV, marginH) {
  this.positionV = positionV || this.positionV;
  this.positionH = positionH || this.positionH;
  this.marginV = marginV || this.marginV;
  this.marginH = marginH || this.marginH;
  if (this.positionV== "top") {
    this.text.position.y = this.marginV * this.scale;
    this.text.anchor.y = 0;
  } else if (this.positionV == "bottom") {
    this.text.position.y = this.frameHeight - this.marginV * this.scale;
    this.text.anchor.y = 1;
  } else if (this.positionV == "center") {
    this.text.position.y = this.frameHeight / 2 - this.marginV * this.scale / 2;
    this.text.anchor.y = 0.5;
  }
  if (this.positionH == "left") {
    this.text.position.x = this.marginH * this.scale;
    this.text.anchor.x = 0;
  } else if (this.positionH == "right") {
    this.text.position.x = this.frameWidth - this.marginH * this.scale;
    this.text.anchor.x = 1;
  } else if (this.positionH == "center") {
    this.text.position.x = this.frameWidth / 2 - this.marginH * this.scale / 2;
    this.text.anchor.x = 0.5;
  }
  if (this.debug == true) 
    console.log("set text position x/y", this.text.position.x, this.text.position.y);
};

ScaledText.prototype.setInteraction = function() {
  this.text.interactive = true;
  this.text.click = function(){
    alert("click text");
  };
};

ScaledText.prototype.resize = function(frameWidth, frameHeight) {
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
  this.calcScale(frameWidth, frameHeight);
  this.setFontSize();
  this.setStrokeThickness();
  this.setText();
  this.setPosition();
};

Metrix.Pixi = function(withFPSMeter, columns, rows) {
  this.renderer = PIXI.autoDetectRenderer(0, 0, {transparent : true});
  this.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.view);

  this.stage = new PIXI.Container();
  //this.stage.interactive = true;

  this.linkedGrid = new LinkedGrid(this.stage, columns, rows, window.innerWidth, window.innerHeight, false);
  
  // set fps meter with hotkey to toggle
  if (withFPSMeter == true)
    this.meter = new FPSMeter(null, { theme: "transparent", graph: 0, heat: 0 });
  this.withFPSMeter = withFPSMeter;
  
  var scope = this;
  window.addEventListener('resize', function(event) {
    scope.renderer.resize(window.innerWidth, window.innerHeight);
    scope.linkedGrid.resize(window.innerWidth, window.innerHeight);
    scope.renderer.render(scope.stage);
  });
};

Metrix.Pixi.prototype.constructor = Metrix.Pixi;

Metrix.Pixi.prototype.animate = function(scope) {
  requestAnimationFrame(function() { scope.animate(scope); });
  scope.renderer.render(scope.stage);
  if (scope.withFPSMeter == true)
    scope.meter.tick();
};

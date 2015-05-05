Metrix.Pixi = function(withFPSMeter) {
  this.renderer = PIXI.autoDetectRenderer(0, 0, {transparent : true});
  this.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.view);

  this.stage = new PIXI.Container();
  //this.stage.interactive = true;

  // calculate screen scale depending on height
  this.screenScale = 100;
  this.screenScale = window.innerHeight / this.screenScale;

  // set fps meter with hotkey to toggle
  if (withFPSMeter == true)
    this.meter = new FPSMeter(null, { theme: "transparent", graph: 0, heat: 0 });
  this.withFPSMeter = withFPSMeter;
};

Metrix.Pixi.prototype.constructor = Metrix.Pixi;

Metrix.Pixi.prototype.animate = function(scope) {
  requestAnimationFrame(function() { scope.animate(scope); });
  scope.renderer.render(scope.stage);
  if (scope.withFPSMeter == true)
    scope.meter.tick();
}
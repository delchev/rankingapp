exports.appearRow = appearRow;
exports.appearZoom = appearZoom;


function appearRow(widget) {
  if (this.animationDone) return;
  this.activeAnimations = this.activeAnimations || 0;
  this.delay = this.delay || 0;

  widget.set({
    opacity: 0.0
    // transform: {translationX: 100}
  });
  ++this.activeAnimations;
  widget.animate({
    opacity: 1.0
    // transform: {translationX: 0}
  }, {
    delay: this.delay,
    duration: 200,
    easing: "ease-out"
  });
  this.delay += 100;
  widget.once('animationend', function() {
    if (--this.activeAnimations <= 0) {
      this.animationDone = true;
    }
  }, this);
}

function appearZoom(widget, options) {
  options = options || {};
  widget.set({
    opacity: 0,
    transform: { scaleX: 0, scaleY: 0 }
  });
  widget.animate({
    opacity: 1,
    transform: { scaleX: 1, scaleY: 1 }
  }, {
    delay: options.delay || 0,
    duration: options.duration || 500,
    easing: "ease-out"
  });
  options.done && widget.once("animationend", options.done);
}

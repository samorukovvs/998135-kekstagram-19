'use strict';
(function () {
  var OFFSET_MIN = 0;
  var OFFSET_MAX = 100;
  var OFFSET_COEFFICIENT = 4.53;
  var effectPin = document.querySelector('.effect-level__pin');


  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var xBegin = evt.clientX;
    var oldPosition = effectPin.style.left;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var xDelta = xBegin - moveEvt.clientX;
      var newPosition = oldPosition.substr(0, oldPosition.length - 1) - (xDelta / OFFSET_COEFFICIENT);

      if (newPosition < OFFSET_MIN) {
        newPosition = OFFSET_MIN;
      }
      if (newPosition > OFFSET_MAX) {
        newPosition = OFFSET_MAX;
      }
      window.photoEffect.setEffectSaturation(newPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();

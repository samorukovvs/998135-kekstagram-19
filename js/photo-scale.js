'use strict';
(function () {
  var SCALE_FACTOR = 25;
  var SCALE_CONTROL_MAXIMUM = 100;
  var SCALE_CONTROL_MINIMUM = 25;
  var SCALE_COEFFICIENT = 100;
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var buttonPhotoSmaller = editPhotoForm.querySelector('.scale__control--smaller');
  var buttonPhotoBigger = editPhotoForm.querySelector('.scale__control--bigger');
  var scaleControl = editPhotoForm.querySelector('.scale__control--value');
  var photoPreview = editPhotoForm.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlValue = 100;


  var resizePhoto = function (size) {
    var transformSize = size / SCALE_COEFFICIENT;
    photoPreview.style.transform = 'scale(' + transformSize + ')';
  };

  var onIncreaseScaleClick = function () {
    scaleControlValue += SCALE_FACTOR;
    if (scaleControlValue > SCALE_CONTROL_MAXIMUM) {
      scaleControlValue = SCALE_CONTROL_MAXIMUM;
    }
    scaleControl.setAttribute('value', scaleControlValue);
    scaleControl.value = scaleControlValue + '%';
    resizePhoto(scaleControlValue);
  };

  var onDecreaseScaleClick = function () {
    scaleControlValue -= SCALE_FACTOR;
    if (scaleControlValue < SCALE_CONTROL_MINIMUM) {
      scaleControlValue = SCALE_CONTROL_MINIMUM;
    }
    scaleControl.setAttribute('value', scaleControlValue);
    scaleControl.value = scaleControlValue + '%';
    resizePhoto(scaleControlValue);
  };

  var resetPhotoSize = function () {
    scaleControl.value = '100%';
    scaleControl.setAttribute('value', '100%');
    photoPreview.style.transform = 'scale(1)';

  };

  buttonPhotoBigger.addEventListener('click', onIncreaseScaleClick);
  buttonPhotoSmaller.addEventListener('click', onDecreaseScaleClick);

  window.photoScale = {
    resetPhotoSize: resetPhotoSize
  };
})();

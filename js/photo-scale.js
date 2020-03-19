'use strict';
(function () {
  var SCALE_FACTOR = 0.25;
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var buttonPhotoSmaller = editPhotoForm.querySelector('.scale__control--smaller');
  var buttonPhotoBigger = editPhotoForm.querySelector('.scale__control--bigger');
  var scaleControl = editPhotoForm.querySelector('.scale__control--value');
  var photoPreview = editPhotoForm.querySelector('.img-upload__preview');
  var photoScaleValue = 1;
  scaleControl.value = '100%';


  var resizePhotoBigger = function () {
    if (photoScaleValue < 1) {
      photoScaleValue += SCALE_FACTOR;
      scaleControl.value = photoScaleValue * 100 + '%';
    }
    photoPreview.style.transform = 'scale(' + photoScaleValue + ')';
  };

  var resizePhotoSmaller = function () {
    if (photoScaleValue > SCALE_FACTOR) {
      photoScaleValue -= SCALE_FACTOR;
      scaleControl.value = photoScaleValue * 100 + '%';
    }
    photoPreview.style.transform = 'scale(' + photoScaleValue + ')';
  };

  var resetPhotoSize = function () {
    scaleControl.value = '100%';
    photoPreview.style.transform = 'scale(1)';

  };

  buttonPhotoBigger.addEventListener('click', resizePhotoBigger);
  buttonPhotoSmaller.addEventListener('click', resizePhotoSmaller);

  window.photoScale = {
    resetPhotoSize: resetPhotoSize
  };
})();

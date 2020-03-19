'use strict';
(function () {
  var body = document.querySelector('body');
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var dataForm = document.querySelector('#upload-select-image');
  var buttonPhotoClose = editPhotoForm.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var hashtagField = document.querySelector('.text__hashtags');
  var descriptionField = document.querySelector('.text__description');

  var onEscKeyPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY && evt.target !== hashtagField && evt.target !== descriptionField) {
      closePhoto();
    }
  };

  var closePhoto = function () {
    window.photoEffect.resetPhoto();
    window.photoScale.resetPhotoSize();
    dataForm.reset();
    body.classList.remove('modal-open');
    editPhotoForm.classList.add('hidden');
    uploadFile.value = '';
    body.removeEventListener('keydown', onEscKeyPress);
  };

  var openPhoto = function () {
    window.photoScale.resetPhotoSize();
    body.classList.add('modal-open');
    editPhotoForm.classList.remove('hidden');
    body.addEventListener('keydown', onEscKeyPress);
    buttonPhotoClose.addEventListener('click', closePhoto);
  };

  dataForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(dataForm), function () {
      closePhoto();
      window.backend.successLoadMessage();
    });
  });

  uploadFile.addEventListener('change', openPhoto);
})();

'use strict';
(function () {
  var body = document.querySelector('body');
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var buttonPhotoClose = editPhotoForm.querySelector('#upload-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var hashtagField = document.querySelector('.text__hashtags');

  var onEscKeyPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY && evt.target !== hashtagField) {
      closePhoto();
    }
  };

  var closePhoto = function () {
    body.classList.remove('modal-open');
    editPhotoForm.classList.add('hidden');
    uploadFile.value = '';
    body.removeEventListener('keydown', onEscKeyPress);
  };

  var openPhoto = function () {
    body.classList.add('modal-open');
    editPhotoForm.classList.remove('hidden');
    body.addEventListener('keydown', onEscKeyPress);
    buttonPhotoClose.addEventListener('click', closePhoto);
  };

  uploadFile.addEventListener('change', openPhoto);

})();

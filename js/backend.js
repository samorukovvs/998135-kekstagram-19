'use strict';
(function () {
  var TIMEOUT = 1000;

  var URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var ResponseCode = {
    OK: 200
  };

  window.request = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ResponseCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Нет соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Таймаут ' + xhr.timeout + 'мс превышен');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.photosMeta = [];
  var successHandler = function (img) {
    window.photosMeta = img.slice();
    window.gallery.renderGallery(img, '.pictures', '#picture', window.gallery.DEFAULT_GALLERY_SIZE, window.photoView.findPictures);
    window.gallery.enableFilter();
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.request(successHandler, errorHandler);

  // Загрузка данных на сервер

  // Сообщение удачной загрузки
  var successLoadMessage = function () {
    var successMessage = document.querySelector('#success').content.cloneNode(true);
    var mainTag = document.querySelector('main');
    mainTag.appendChild(successMessage);
    var successLoadButton = mainTag.querySelector('.success__button');
    var successLoadWindow = mainTag.querySelector('.success');
    window.utils.confirmOpened(successLoadWindow, successLoadButton);

  };
  // Сообщение неудачной загрузки
  var errorLoadMessage = function () {
    var errorMessage = document.querySelector('#error').content.cloneNode(true);
    var mainTag = document.querySelector('main');
    mainTag.appendChild(errorMessage);
    var errorLoadButton = mainTag.querySelector('.error__button');
    var errorLoadWindow = mainTag.querySelector('.error');
    window.utils.confirmOpened(errorLoadWindow, errorLoadButton);
  };

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);

    });

    xhr.addEventListener('error', function () {
      window.photoOpen.closePhoto();
      errorLoadMessage();
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    upload: upload,
    successLoadMessage: successLoadMessage
  };
})();

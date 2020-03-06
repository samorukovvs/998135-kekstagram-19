'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var ResponseCode = {
    OK: 200
  };
  var TIMEOUT = 1000;

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
    window.gallery.renderGallery(img, '.pictures', '#picture', window.gallery.DEFAULT_GALLERY_SIZE);
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
})();

'use strict';
(function () {
  var body = document.querySelector('body');
  var createRandomInteger = function (beginFrom, endOn) {
    return Math.floor(beginFrom + Math.random() * (endOn - (beginFrom - 1)));
  };

  var createRandomArray = function (beginFrom, endOn, length) {
    var randoms = [];
    while (randoms.length < length) {
      var randomInteger = createRandomInteger(beginFrom, endOn);
      if (!randoms.includes(randomInteger)) {
        randoms.push(randomInteger);
      }
    }
    return randoms;
  };
  // Обработчик модальных окон с сообщениями
  var confirmOpened = function (confirm, button) {
    var onEscKeyPress = function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        confirm.remove();
        body.removeEventListener('keydown', onEscKeyPress);
      }
    };
    body = document.querySelector('body');
    body.addEventListener('keydown', onEscKeyPress);
    button.addEventListener('click', function () {
      confirm.remove();
      body.removeEventListener('keydown', onEscKeyPress);
    });
  };

  window.utils = {
    createRandomInteger: createRandomInteger,
    createRandomArray: createRandomArray,
    confirmOpened: confirmOpened,
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'


  };
})();

'use strict';
(function () {
  var createRandomInteger = function (beginFrom, endOn) {
    return Math.floor(beginFrom + Math.random() * (endOn - (beginFrom - 1)));
  };

  var createRandomArray = function (beginFrom, endOn, length) {
    var randomArray = [];
    while (randomArray.length < length) {
      var randomInteger = createRandomInteger(beginFrom, endOn);
      if (!randomArray.includes(randomInteger)) {
        randomArray.push(randomInteger);
      }
    }
    return randomArray;
  };
  window.utils = {
    createRandomInteger: createRandomInteger,
    createRandomArray: createRandomArray,
    ESC_KEY: 'Escape'
  };
})();

'use strict';
(function () {
  var SYMBOL_REGEX = /^([#])([a-zA-ZА-Яа-я0-9]{1,19})$/;
  var SPEC_SYMBOL = /^([#])([a-zA-ZА-Яа-я0-9]*)$/;
  var hashtagField = document.querySelector('.text__hashtags');
  var checkHashtags = function () {
    hashtagField.setCustomValidity('');
    // Проверка на пустой хештег
    if (hashtagField.value === '') {
      return true;
    }
    var hashtags = hashtagField.value.split(' ');
    // Проверка строки хештегов
    // Смена регистра и сортировка
    var sortedHashtags = hashtags.map(function (value) {
      return value.toLowerCase();
    }).sort();
    for (var i = 0; i < hashtags.length; i++) {
      if (sortedHashtags[i] === sortedHashtags[i + 1]) {
        hashtagField.setCustomValidity('Хештеги не должны повторяться');
      }
    }
    if (hashtags.length > 5) {
      hashtagField.setCustomValidity('Хештегов должно быть меньше 5');
    }
    // Проверка отдельных хэштегов
    if (hashtagField.validationMessage === '') {
      for (i = 0; i < hashtags.length; i++) {
        if (SYMBOL_REGEX.test(hashtags[i])) {
          hashtagField.setCustomValidity('');
        } else {
          if (hashtags[i].indexOf('#') !== 0) {
            hashtagField.setCustomValidity('Хештег должен начинаться с #');
          }

          if (SPEC_SYMBOL.test(hashtags[i]) !== true) {
            hashtagField.setCustomValidity('Хештег не может содержать спецсимволы');
            return false;
          }
          if (hashtags[i].length > 19) {
            hashtagField.setCustomValidity('Хештег должен быть короче 20 символов');
            return false;
          }
          if (hashtags[i] === '#') {
            hashtagField.setCustomValidity('Хештег не может состоять из одной #');
            return false;
          }
        }
      }
    }
    return true;
  };
  document.querySelector('.img-upload__submit').addEventListener('click', checkHashtags);
})();

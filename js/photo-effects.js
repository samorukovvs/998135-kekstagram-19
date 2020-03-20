'use strict';
(function () {
  var PHOTO_EFFECTS = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];
  var EFFECT_COEFFICIENT = 100;

  var currentPhotoEffect = '';
  var effects = document.querySelector('.img-upload__effects');
  var effectsSlider = document.querySelector('.img-upload__effect-level');
  var effectPin = document.querySelector('.effect-level__pin');
  var effectValue = document.querySelector('.effect-level__value');
  var effectVisualValueDepth = document.querySelector('.effect-level__depth');
  var photoPreview = document.querySelector('.img-upload__preview');

  var ammountOfEffects = PHOTO_EFFECTS.length;

  // Рассчет насыщенности эффекта
  var calculateEffect = function (position, effectName) {
    switch (effectName) {
      case 'effects__preview--none':
        return 'none';
      case 'effects__preview--chrome':
        return 'grayscale(' + position + ')';
      case 'effects__preview--sepia':
        return 'sepia(' + position + ')';
      case 'effects__preview--marvin':
        return 'invert(' + position * 100 + '%)';
      case 'effects__preview--phobos':
        return 'blur(' + Math.floor(position * 3) + 'px)';
      case 'effects__preview--heat':
        return 'brightness(' + ((position * 2) + 1) + ')';
    }
    return false;
  };
  // Установка насыщенности эффекта
  var setEffectSaturation = function (value) {
    effectPin.style.left = (value) + '%';
    effectVisualValueDepth.style.width = (value) + '%';
    effectValue.setAttribute('value', (value) + '%');
    photoPreview.style.filter = calculateEffect(value / EFFECT_COEFFICIENT, currentPhotoEffect);
  };
  // Выбор эффекта
  var setPhotoEffect = function (effect) {
    for (var i = 0; i < PHOTO_EFFECTS.length; i++) {
      if (effect.includes(PHOTO_EFFECTS[i])) {
        if (currentPhotoEffect !== '') {
          photoPreview.classList.remove(currentPhotoEffect);
        }
        if (PHOTO_EFFECTS[i] !== 'effects__preview--none' & currentPhotoEffect === 'effects__preview--none') {
          effectsSlider.classList.remove('hidden');
        }
        if (PHOTO_EFFECTS[i] === 'effects__preview--none') {
          effectsSlider.classList.add('hidden');
        }
        photoPreview.classList.add(PHOTO_EFFECTS[i]);
        currentPhotoEffect = PHOTO_EFFECTS[i];
      }
    }
    setEffectSaturation(100);
  };
  setPhotoEffect('effects__preview--none');
  var effectPreviews = [];
  for (var i = 0; i < ammountOfEffects; i++) {
    effectPreviews[i] = effects.querySelector('.' + PHOTO_EFFECTS[i]);
    effectPreviews[i].addEventListener('click', function (evt) {
      setPhotoEffect(evt.target.classList.value);
    });
  }
  var resetPhoto = function () {
    setEffectSaturation(100);
    setPhotoEffect('effects__preview--none');
  };

  window.photoEffect = {
    resetPhoto: resetPhoto,
    setEffectSaturation: setEffectSaturation
  };
})();

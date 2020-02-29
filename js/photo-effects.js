'use strict';
(function () {
  var currentPhotoEffect = '';
  var effects = document.querySelector('.img-upload__effects');
  var effectsSlider = document.querySelector('.img-upload__effect-level');
  var effectPin = document.querySelector('.effect-level__pin');
  var effectValue = document.querySelector('.effect-level__value');
  var effectVisualValueDepth = document.querySelector('.effect-level__depth');
  var photoPreview = document.querySelector('.img-upload__preview');

  var photoEffect = [
    'effects__preview--none',
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  ];
  var ammountOfEffects = photoEffect.length;

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
    effectPin.style.left = (value * 100) + '%';
    effectVisualValueDepth.style.width = (value * 100) + '%';
    effectValue.setAttribute('value', (value * 100) + '%');
    photoPreview.style.filter = calculateEffect(value, currentPhotoEffect);
  };
  // Выбор эффекта
  var setPhotoEffect = function (effect) {
    for (var i = 0; i < photoEffect.length; i++) {
      if (effect.includes(photoEffect[i])) {
        if (currentPhotoEffect !== '') {
          photoPreview.classList.remove(currentPhotoEffect);
        }
        if (photoEffect[i] !== 'effects__preview--none' & currentPhotoEffect === 'effects__preview--none') {
          effectsSlider.classList.remove('hidden');
        }
        if (photoEffect[i] === 'effects__preview--none') {
          effectsSlider.classList.add('hidden');
        }
        photoPreview.classList.add(photoEffect[i]);
        currentPhotoEffect = photoEffect[i];
      }
    }
    setEffectSaturation(1);
  };
  setPhotoEffect('effects__preview--none');
  var effectPreview = [];
  for (var i = 0; i < ammountOfEffects; i++) {
    effectPreview[i] = effects.querySelector('.' + photoEffect[i]);
    effectPreview[i].addEventListener('click', function (evt) {
      setPhotoEffect(evt.target.classList.value);
    });
  }

  effectPin.addEventListener('mouseup', function () {
    setEffectSaturation(0.5);
  });
})();

'use strict';
var photoPossibleData = {
  NAME: [
    'Эшлинн Брук',
    'Дженна Хейз',
    'Джесси Джейн',
    'Эван Стоун',
    'Кэйден Кросс'
  ],
  PICTURE_DESCRIPTION: [
    'Закат',
    'Прибытие поезда',
    'С парашютом!',
    'Высадка на луну.',
    'Смотри как я умею'
  ],
  COMMENT_NAME: [
    'Ирвин',
    'Марвин',
    'Кельвин',
    'Остин',
    'Вениамин'
  ],
  COMMENT_MESSAGE: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ]
};
var hashtagField = document.querySelector('.text__hashtags');
var ESC_KEY = 'Escape';
var createRandomInteger = function (beginFrom, endOn) {
  return Math.floor(beginFrom + Math.random() * (endOn - (beginFrom - 1)));
};

var createPhotoMeta = function (photoNumber) {
  var ammountOfComments = createRandomInteger(1, 4);
  var photoName = {
    url: 'photos/' + photoNumber + '.jpg',
    description: photoPossibleData.PICTURE_DESCRIPTION[createRandomInteger(0, photoPossibleData.PICTURE_DESCRIPTION.length - 1)],
    likes: createRandomInteger(15, 200),
    comments: []
  };
  for (var i = 0; i < ammountOfComments; i++) {
    var numberOfComment = createRandomInteger(0, photoPossibleData.COMMENT_MESSAGE.length - 1);
    photoName.comments[i] = {
      avatar: 'img/avatar-' + createRandomInteger(1, 6) + '.svg',
      COMMENT_MESSAGE: photoPossibleData.COMMENT_MESSAGE[numberOfComment],
      name: photoPossibleData.COMMENT_NAME[createRandomInteger(0, photoPossibleData.COMMENT_NAME.length - 1)]
    };
  }
  return photoName;
};

var img = [];
for (var i = 1; i <= 25; i++) {
  img[i] = createPhotoMeta(i);
}

var fillPhotoTemplate = function (template, photo) {
  var newPhoto = document.querySelector(template).content.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = photo.url;
  newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
  newPhoto.querySelector('.picture__likes').textContent = photo.likes;
  return newPhoto;
};

var fillFragment = function (photos, templateFrom) {
  var fragment = document.createDocumentFragment();
  for (i = 1; i < photos.length; i++) {
    fragment.appendChild(fillPhotoTemplate(templateFrom, photos[i]));
  }
  return fragment;
};

var renderFragment = function (photos, whereTo, templateFrom) {
  var fragmentToRender = fillFragment(photos, templateFrom);
  var fragmentPlace = document.querySelector(whereTo);
  fragmentPlace.appendChild(fragmentToRender);
};
renderFragment(img, '.pictures', '#picture');

// Работа с загрузкой изображений
var uploadFile = document.querySelector('#upload-file');
var body = document.querySelector('body');
var editPhotoForm = document.querySelector('.img-upload__overlay');
var buttonPhotoClose = editPhotoForm.querySelector('#upload-cancel');
var buttonPhotoSmaller = editPhotoForm.querySelector('.scale__control--smaller');
var buttonPhotoBigger = editPhotoForm.querySelector('.scale__control--bigger');
var scaleControl = editPhotoForm.querySelector('.scale__control--value');
var photoPreview = editPhotoForm.querySelector('.img-upload__preview');

// Открытие и закрытие изображения
var closePhoto = function () {
  body.classList.remove('modal-open');
  editPhotoForm.classList.add('hidden');
  uploadFile.value = '';
};

var openPhoto = function () {
  body.classList.add('modal-open');
  editPhotoForm.classList.remove('hidden');
  body.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY && evt.target !== hashtagField) {
      closePhoto();
    }
  });
  buttonPhotoClose.addEventListener('click', closePhoto);
  scaleControl.value = '100%';
};

uploadFile.addEventListener('change', openPhoto);

// Работа с масштабом
var photoScaleValue = 1;

var resizePhotoBigger = function () {
  if (photoScaleValue < 1) {
    photoScaleValue += 0.25;
    scaleControl.value = photoScaleValue * 100 + '%';
  }
  photoPreview.style.transform = 'scale(' + photoScaleValue + ')';
};

var resizePhotoSmaller = function () {
  if (photoScaleValue > 0.25) {
    photoScaleValue -= 0.25;
    scaleControl.value = photoScaleValue * 100 + '%';
  }
  photoPreview.style.transform = 'scale(' + photoScaleValue + ')';
};
buttonPhotoBigger.addEventListener('click', resizePhotoBigger);
buttonPhotoSmaller.addEventListener('click', resizePhotoSmaller);

// Работа с фильтрами
var currentPhotoEffect = '';
var effects = document.querySelector('.img-upload__effects');
var effectsSlider = document.querySelector('.img-upload__effect-level');
var effectPin = document.querySelector('.effect-level__pin');
var effectValue = document.querySelector('.effect-level__value');
var effectVisualValueDepth = document.querySelector('.effect-level__depth');

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
  for (i = 0; i < photoEffect.length; i++) {
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
for (i = 0; i < ammountOfEffects; i++) {
  effectPreview[i] = effects.querySelector('.' + photoEffect[i]);
  effectPreview[i].addEventListener('click', function (evt) {
    setPhotoEffect(evt.target.classList.value);
  });
}

effectPin.addEventListener('mouseup', function () {
  setEffectSaturation(0.5);
});

// Валидация хештегов
var symbolREGEX = /^([#])([a-zA-ZА-Яа-я0-9]{1,19})$/;
var specSymbol = /^([#])([a-zA-ZА-Яа-я0-9]*)$/;


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
  for (i = 0; i < hashtags.length; i++) {
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
      if (symbolREGEX.test(hashtags[i])) {
        hashtagField.setCustomValidity('');
      } else {
        if (hashtags[i].indexOf('#') !== 0) {
          hashtagField.setCustomValidity('Хештег должен начинаться с #');
        }

        if (specSymbol.test(hashtags[i]) !== true) {
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

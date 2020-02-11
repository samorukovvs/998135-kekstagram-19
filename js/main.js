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

var closePhoto = function () {
  body.classList.remove('modal-open');
  editPhotoForm.classList.add('hidden');
  uploadFile.value = '';
};

var openPhoto = function () {
  body.classList.add('modal-open');
  editPhotoForm.classList.remove('hidden');
  body.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      closePhoto();
    }
  });
  buttonPhotoClose.addEventListener('click', closePhoto);

};

uploadFile.addEventListener('change', openPhoto);

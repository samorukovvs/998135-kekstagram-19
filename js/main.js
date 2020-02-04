'use strict';
var PhotoPossibleData = {
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

var createRandomInteger = function (beginFrom, endOn) {
  return Math.floor(beginFrom + Math.random() * (endOn - (beginFrom - 1)));
};

var createPhotoMeta = function (photoNumber) {
  var ammountOfComments = createRandomInteger(1, 4);
  var photoName = {
    url: 'photos/' + photoNumber + '.jpg',
    description: PhotoPossibleData.PICTURE_DESCRIPTION[createRandomInteger(0, PhotoPossibleData.PICTURE_DESCRIPTION.length - 1)],
    likes: createRandomInteger(15, 200),
    comments: []
  };
  for (var i = 0; i < ammountOfComments; i++) {
    var numberOfComment = createRandomInteger(0, PhotoPossibleData.COMMENT_MESSAGE.length - 1);
    photoName.comments[i] = {
      avatar: 'img/avatar-' + createRandomInteger(1, 6) + '.svg',
      COMMENT_MESSAGE: PhotoPossibleData.COMMENT_MESSAGE[numberOfComment],
      name: PhotoPossibleData.COMMENT_NAME[createRandomInteger(0, PhotoPossibleData.COMMENT_NAME.length - 1)]
    };
  }
  return photoName;
};

var img = [];
for (var i = 1; i <= 25; i++) {
  img[i] = createPhotoMeta(i);
}

var fillPhotoTemplate = function (template, photo) {

  var newPhoto = document.querySelector(template).cloneNode(true);
  console.log(newPhoto.querySelector('.picture__img'));
  newPhoto.querySelector('.picture__img').src = photo.url;
  newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
  newPhoto.querySelector('.picture__likes').textContent = photo.likes;
  return newPhoto;
};
console.log(fillPhotoTemplate('#picture'), img[2]);

var fillFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture');

  for (i = 0; i < photos.length; i++) {
    fragment.appendChild(fillPhotoTemplate(photoTemplate, photos[i]));
  }
  return fragment;
};

var renderFragment = function (photos) {
  var fragmentToRender = fillFragment(photos);
  var fragmentPlace = document.querySelector('.pictures');
  fragmentPlace.appendChild(fragmentToRender);
};

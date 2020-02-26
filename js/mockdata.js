'use strict';

(function () {
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

  var createPhotoMeta = function (photoNumber) {
    var ammountOfComments = window.utils.createRandomInteger(1, 4);
    var photoName = {
      url: 'photos/' + photoNumber + '.jpg',
      description: photoPossibleData.PICTURE_DESCRIPTION[window.utils.createRandomInteger(0, photoPossibleData.PICTURE_DESCRIPTION.length - 1)],
      likes: window.utils.createRandomInteger(15, 200),
      comments: []
    };
    for (var i = 0; i < ammountOfComments; i++) {
      var numberOfComment = window.utils.createRandomInteger(0, photoPossibleData.COMMENT_MESSAGE.length - 1);
      photoName.comments[i] = {
        avatar: 'img/avatar-' + window.utils.createRandomInteger(1, 6) + '.svg',
        COMMENT_MESSAGE: photoPossibleData.COMMENT_MESSAGE[numberOfComment],
        name: photoPossibleData.COMMENT_NAME[window.utils.createRandomInteger(0, photoPossibleData.COMMENT_NAME.length - 1)]
      };
    }
    return photoName;
  };
  var img = [];
  for (var i = 1; i <= 25; i++) {
    img[i] = createPhotoMeta(i);
  }
  window.utils.renderFragment(img, '.pictures', '#picture');
})();

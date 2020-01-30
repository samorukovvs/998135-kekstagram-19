'use strict';
var PhotoData = {
  MESSAGE: [
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

var createPhotoMeta = function () {
  var numberOfComments = createRandomInteger(1, 4);
  var photoName = {
    url: 'photos/' + createRandomInteger(1, 25) + '.jpg',
    description: 'Описание фото',
    likes: createRandomInteger(15, 200),
    comment: []
  };
  for (var i = 0; i < numberOfComments; i++) {
    var numberOfComment = createRandomInteger(1, PhotoData.MESSAGE.length - 1);
    console.log(PhotoData.MESSAGE[numberOfComment]);
    photoName.comment[i] = PhotoData.MESSAGE[numberOfComment];
  }
  return photoName;
};


console.log(createPhotoMeta());

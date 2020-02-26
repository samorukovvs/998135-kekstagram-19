'use strict';
(function () {
  var createRandomInteger = function (beginFrom, endOn) {
    return Math.floor(beginFrom + Math.random() * (endOn - (beginFrom - 1)));
  };

  var fillPhotoTemplate = function (template, photo) {
    var newPhoto = document.querySelector(template).content.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photo.url;
    newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    newPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return newPhoto;
  };

  var fillFragment = function (photos, templateFrom) {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i < photos.length; i++) {
      fragment.appendChild(fillPhotoTemplate(templateFrom, photos[i]));
    }
    return fragment;
  };

  var renderFragment = function (photos, whereTo, templateFrom) {
    var fragmentToRender = fillFragment(photos, templateFrom);
    var fragmentPlace = document.querySelector(whereTo);
    fragmentPlace.appendChild(fragmentToRender);
  };

  window.utils = {
    createRandomInteger: createRandomInteger,
    renderFragment: renderFragment,
    ESC_KEY: 'Escape'
  };
})();

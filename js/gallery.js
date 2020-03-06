'use strict';
(function () {
  var DEFAULT_GALLERY_SIZE = 25;
  var RANDOM_GALLERY_SIZE = 10;
  var DEBOUNCE_TIMEOUT = 1000;
  var imgFilter = document.querySelector('.img-filters');
  var defaultSortButton = document.querySelector('#filter-default');
  var randomSortButton = document.querySelector('#filter-random');
  var discussedSortButton = document.querySelector('#filter-discussed');


  var fillPhotoTemplate = function (template, photo) {
    var newPhoto = document.querySelector(template).content.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photo.url;
    newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    newPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return newPhoto;
  };

  var fillFragment = function (photos, templateFrom, ammountOfImages) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ammountOfImages; i++) {
      fragment.appendChild(fillPhotoTemplate(templateFrom, photos[i]));
    }
    return fragment;
  };
  var timoutId;
  var renderGallery = function (photos, whereTo, templateFrom, ammountOfImages) {

    if (timoutId) {
      window.clearTimeout(timoutId);
    }
    timoutId = window.setTimeout(function () {
      var fragmentToRender = fillFragment(photos, templateFrom, ammountOfImages);
      var fragmentPlace = document.querySelector(whereTo);
      fragmentPlace.appendChild(fragmentToRender);
    }, DEBOUNCE_TIMEOUT);
  };

  var renderRandomGallery = function () {
    var randomPicturesIndex = window.utils.createRandomArray(0, window.photosMeta.length - 1, RANDOM_GALLERY_SIZE);
    var randomPictures = [];
    for (var i = 0; i < randomPicturesIndex.length; i++) {
      randomPictures.push(window.photosMeta[randomPicturesIndex[i]]);
    }
    window.gallery.renderGallery(randomPictures, '.pictures', '#picture', RANDOM_GALLERY_SIZE);
  };

  var renderDiscussedGallery = function () {
    var discussedPictures = window.photosMeta.slice();

    discussedPictures.sort(function (img1, img2) {
      if (img1.comments.length > img2.comments.length) {
        return -1;
      } else if (img1.comments.length < img2.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
    window.gallery.renderGallery(discussedPictures, '.pictures', '#picture', DEFAULT_GALLERY_SIZE);
  };

  var removeGallery = function () {
    document.querySelectorAll('.picture').forEach(function (picture) {
      picture.remove();
    });
  };

  var makeButtonActive = function (button) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  var enableFilter = function () {
    imgFilter.classList.remove('img-filters--inactive');
  };

  defaultSortButton.addEventListener('click', function () {
    removeGallery();
    makeButtonActive(defaultSortButton);
    renderGallery(window.photosMeta, '.pictures', '#picture', DEFAULT_GALLERY_SIZE);
  });

  randomSortButton.addEventListener('click', function () {
    makeButtonActive(randomSortButton);
    removeGallery();
    renderRandomGallery();
  });

  discussedSortButton.addEventListener('click', function () {
    makeButtonActive(discussedSortButton);
    removeGallery();
    renderDiscussedGallery();
  });

  window.gallery = {
    DEFAULT_GALLERY_SIZE: DEFAULT_GALLERY_SIZE,
    enableFilter: enableFilter,
    renderGallery: renderGallery,
    removeGallery: removeGallery
  };
})();

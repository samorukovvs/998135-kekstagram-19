'use strict';
(function () {
  var DEFAULT_GALLERY_SIZE = 25;
  var RANDOM_GALLERY_SIZE = 10;
  var DEBOUNCE_TIMEOUT = 500;
  var imgFilter = document.querySelector('.img-filters');
  var defaultSortButton = document.querySelector('#filter-default');
  var randomSortButton = document.querySelector('#filter-random');
  var discussedSortButton = document.querySelector('#filter-discussed');


  var fillPhotoTemplate = function (template, photo, id) {
    var newPhoto = document.querySelector(template).content.cloneNode(true);
    newPhoto.querySelector('a').dataset.id = id;
    photo.id = id;
    newPhoto.querySelector('.picture__img').src = photo.url;
    newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    newPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return newPhoto;
  };

  var fillFragment = function (photos, templateFrom, ammountOfImages) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ammountOfImages; i++) {
      fragment.appendChild(fillPhotoTemplate(templateFrom, photos[i], i));
    }
    return fragment;
  };
  var timoutId;
  var renderGallery = function (photos, whereTo, templateFrom, ammountOfImages, findPictures) {

    if (timoutId) {
      window.clearTimeout(timoutId);
    }
    timoutId = window.setTimeout(function () {
      removeGallery();
      var fragmentToRender = fillFragment(photos, templateFrom, ammountOfImages);
      var fragmentPlace = document.querySelector(whereTo);
      fragmentPlace.appendChild(fragmentToRender);
      window.gallery.currentGalleryPhotosMeta = photos.slice();
      findPictures();
    }, DEBOUNCE_TIMEOUT);
  };

  var renderRandomGallery = function () {
    var randomPicturesIndex = window.utils.createRandomArray(0, window.photosMeta.length - 1, RANDOM_GALLERY_SIZE);
    var randomPictures = [];
    for (var i = 0; i < randomPicturesIndex.length; i++) {
      randomPictures.push(window.photosMeta[randomPicturesIndex[i]]);
    }
    window.gallery.render(randomPictures, '.pictures', '#picture', RANDOM_GALLERY_SIZE, window.photoView.findPictures);

  };

  var renderDiscussedGallery = function () {
    var discussedPictures = window.photosMeta.slice();

    discussedPictures.sort(function (img1, img2) {
      if (img1.comments.length > img2.comments.length) {
        return -1;
      }
      if (img1.comments.length < img2.comments.length) {
        return 1;
      }
      return 0;
    });
    window.gallery.render(discussedPictures, '.pictures', '#picture', DEFAULT_GALLERY_SIZE, window.photoView.findPictures);
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
    makeButtonActive(defaultSortButton);
    renderGallery(window.photosMeta, '.pictures', '#picture', DEFAULT_GALLERY_SIZE, window.photoView.findPictures);
  });

  randomSortButton.addEventListener('click', function () {
    makeButtonActive(randomSortButton);
    renderRandomGallery();
  });

  discussedSortButton.addEventListener('click', function () {
    makeButtonActive(discussedSortButton);
    renderDiscussedGallery();
  });

  window.gallery = {
    DEFAULT_SIZE: DEFAULT_GALLERY_SIZE,
    enableFilter: enableFilter,
    render: renderGallery
  };
})();

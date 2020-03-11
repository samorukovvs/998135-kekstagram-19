'use strict';
(function () {
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var findPictures = function () {
    var pictures = document.querySelectorAll('.picture__img');
    pictures.forEach(function (picture) {
      picture.addEventListener('click', function () {
        showBigPicture(picture.attributes.src.value);
      });
      picture.parentElement.addEventListener('keydown', function (evt) {
        if (evt.key === window.utils.ENTER_KEY) {
          showBigPicture(picture.attributes.src.value);
        }
      });
    });
  };

  var closePhoto = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    body.removeEventListener('keydown', onEscKeyPress);
  };

  var onEscKeyPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closePhoto();
    }
  };

  var showBigPicture = function (url) {
  // Сопоставление DOM элемента с данными полученными с сервера через адрес картинки
    var pictureToShow = window.photosMeta.filter(function (el) {
      return el.url === url;
    });

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('#picture-cancel').addEventListener('click', closePhoto);
    body.classList.add('modal-open');
    body.addEventListener('keydown', onEscKeyPress);
    bigPicture.querySelectorAll('.social__comment').forEach(function (comment) {
      comment.remove();
    });
    var bigPictureImage = bigPicture.querySelector('img');
    var bigPictureDescription = bigPicture.querySelector('.social__caption');
    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
    var socialComments = document.querySelector('.social__comments');
    bigPictureImage.src = pictureToShow[0].url;
    bigPictureDescription.textContent = pictureToShow[0].description;
    bigPictureLikes.textContent = pictureToShow[0].likes;
    bigPictureCommentsCount.textContent = pictureToShow[0].comments.length;
    pictureToShow[0].comments.forEach(function (comment) {
      socialComments.insertAdjacentHTML('beforeend', '<li class="social__comment"><img class="social__picture" src="' + comment.avatar + '" alt="' + comment.name + '" width="35" height="35"> <p class="social__text">' + comment.message + '</p></li>');
    });
  };

  window.photoView = {
    showBigPicture: showBigPicture,
    findPictures: findPictures
  };
}());

'use strict';
(function () {
  var AMMOUNT_OF_COMMENTS_TO_SHOW = 5;
  var socialComments = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');
  var shownCommentsCounter = document.querySelector('.social__comment-count');
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('img');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');

  var findPictures = function () {
    var pictures = document.querySelectorAll('.picture__img');
    pictures.forEach(function (picture) {
      picture.addEventListener('click', function () {
        showBigPicture(picture.parentElement.dataset.id);
      });

      picture.parentElement.addEventListener('keydown', function (evt) {
        if (evt.key === window.utils.ENTER_KEY) {
          showBigPicture(picture.parentElement.dataset.id);
        }
      });
    });
  };
  // Обработчики закрытия изображения
  var closePhoto = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    body.removeEventListener('keydown', onEscKeyPress);
    totalCommentsAmmount = 0;
  };

  var onEscKeyPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closePhoto();
    }
  };

  var onCancelClick = function () {
    closePhoto();
  };
  var totalCommentsAmmount;
  var pictureToShow;
  var currentAmmountOfComments;

  var showBigPicture = function (id) {
    pictureToShow = window.gallery.currentGalleryPhotosMeta[id];
    currentAmmountOfComments = 0;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('#picture-cancel').addEventListener('click', onCancelClick);
    body.classList.add('modal-open');
    body.addEventListener('keydown', onEscKeyPress);
    bigPicture.querySelectorAll('.social__comment').forEach(function (comment) {
      comment.remove();
    });

    bigPictureImage.src = pictureToShow.url;
    bigPictureDescription.textContent = pictureToShow.description;
    bigPictureLikes.textContent = pictureToShow.likes;
    totalCommentsAmmount = pictureToShow.comments.length;
    showMoreComments();
  };

  var showMoreComments = function () {
    var currentComment = currentAmmountOfComments;
    if (pictureToShow.comments.length > (currentAmmountOfComments + AMMOUNT_OF_COMMENTS_TO_SHOW)) {
      var ammountOfCommentToShowNow = AMMOUNT_OF_COMMENTS_TO_SHOW;
    } else {
      ammountOfCommentToShowNow = totalCommentsAmmount - currentAmmountOfComments;
    }
    for (currentComment; currentComment < currentAmmountOfComments + ammountOfCommentToShowNow; currentComment++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      var p = document.createElement('p');
      li.classList.add('social__comment');
      img.classList.add('social__picture');
      img.setAttribute('src', pictureToShow.comments[currentComment].avatar);
      img.setAttribute('alt', pictureToShow.comments[currentComment].name);
      img.style.width = 35;
      img.style.height = 35;
      p.classList.add('social__text');
      p.textContent = pictureToShow.comments[currentComment].message;
      li.appendChild(img);
      li.appendChild(p);
      socialComments.appendChild(li);
    }
    currentAmmountOfComments = currentComment;
    shownCommentsCounter.innerHTML = currentAmmountOfComments + ' из ' + totalCommentsAmmount + ' комментариев';
  };


  var onLoadCommentsClick = function () {
    showMoreComments();
  };

  commentsLoader.addEventListener('click', onLoadCommentsClick);

  window.photoView = {
    showBigPicture: showBigPicture,
    findPictures: findPictures
  };
}());

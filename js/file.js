'use strict';

(function () {

  var avatarInput = document.querySelector('#avatar');
  var avatarContainer = document.querySelector('.ad-form-header__preview > img');
  var photoInput = document.querySelector('#images');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  var ImgStyle = {
    OPACITY_ON: '0.4',
    OPACITY_OFF: '1.0',
    OUTLINE_ON: '1px solid #ffaa99',
    OUTLINE_OFF: 'none'
  };

  var ImgSize = {
    WIDTH: '70px',
    HEIGHT: '70px'
  };
  var dragSourceEl = null;

  var validImgTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  function onAvatarInputChange() {
    var fReader = new FileReader();
    fReader.readAsDataURL(avatarInput.files[0]);
    fReader.addEventListener('load', renderAvatar);
  }

  function renderAvatar(evt) {
    avatarContainer.src = evt.target.result;
  }

  function onPhotoInputChange() {
    var photoFiles = photoInput.files;
    for (var file in photoFiles) {
      if (photoFiles.hasOwnProperty(file)) {
        readFile(photoFiles[file]);
      }
    }
  }

  function removeBlank() {
    var blank = photosContainer.querySelector('.ad-form__photo');
    if (blank !== null && blank.childElementCount === 0) {
      photosContainer.removeChild(blank);
    }
  }

  function readFile(file) {
    if (validImgTypes.includes(file.type)) {
      var fReader = new FileReader();
      fReader.readAsDataURL(file);
      fReader.addEventListener('load', renderPhoto);
      removeBlank();
    }
  }

  function createPhoto(evt) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    var img = document.createElement('img');
    img.setAttribute('draggable', true);
    img.addEventListener('dragstart', onImgDragStart);
    img.addEventListener('dragenter', onImgDragEnter);
    img.addEventListener('dragover', onImgDragOver);
    img.addEventListener('dragleave', onImgDragLeave);
    img.addEventListener('drop', onImgDrop);
    img.addEventListener('dragend', onImgDragEnd);
    img.style.cursor = 'move';
    img.style.width = ImgSize.WIDTH;
    img.style.height = ImgSize.HEIGHT;
    img.src = evt.target.result;
    div.appendChild(img);
    return div;
  }

  function renderPhoto(evt) {
    var photo = createPhoto(evt);
    photosContainer.appendChild(photo);
  }

  function onImgDragStart(evt) {
    dragSourceEl = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    dragSourceEl.style.opacity = ImgStyle.OPACITY_ON;
    evt.dataTransfer.setData('src', dragSourceEl.src);
  }

  function onImgDragEnter(evt) {
    if (dragSourceEl !== evt.target) {
      evt.target.style.outline = ImgStyle.OUTLINE_ON;
    }
    evt.preventDefault();
  }

  function onImgDragOver(evt) {
    evt.preventDefault();
  }

  function onImgDragLeave(evt) {
    evt.target.style.outline = ImgStyle.OUTLINE_OFF;
  }

  function onImgDragEnd(evt) {
    evt.target.style.opacity = ImgStyle.OPACITY_OFF;
  }

  function onImgDrop(evt) {
    var dragTargetEl = evt.target;
    if (dragSourceEl !== dragTargetEl) {
      dragSourceEl.src = dragTargetEl.src;
      dragTargetEl.src = evt.dataTransfer.getData('src');
      removeImgStyles();
    }
  }

  function removeImgStyles() {
    var imgs = photosContainer.querySelectorAll('.ad-form__photo');
    [].forEach.call(imgs, function (it) {
      it.children[0].style.opacity = ImgStyle.OPACITY_OFF;
      it.children[0].style.outline = ImgStyle.OUTLINE_OFF;
    });
  }

  window.file = {
    onAvatarInputChange: onAvatarInputChange,
    onPhotoInputChange: onPhotoInputChange
  };
})();

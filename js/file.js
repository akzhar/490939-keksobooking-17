'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var avatarInput = document.querySelector('#avatar');
  var avatarContainer = document.querySelector('.ad-form-header__preview > img');
  var photoInput = document.querySelector('#images');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var dragSourceEl = null;

  function removeEmptyBlank() {
    var blank = photosContainer.querySelector('.' + dependencies.data.PHOTO_BLANK_CLASS);
    if (blank !== null && blank.childElementCount === 0) {
      photosContainer.removeChild(blank);
    }
  }

  function removeImgStyles() {
    var imgs = photosContainer.querySelectorAll('.ad-form__photo');
    [].forEach.call(imgs, function (it) {
      it.children[0].style.opacity = dependencies.data.ImgStyle.OPACITY_OFF;
      it.children[0].style.outline = dependencies.data.ImgStyle.OUTLINE_OFF;
    });
  }

  function doIfFileIsValid(file, callback) {
    if (dependencies.data.VALID_IMG_TYPES.includes(file.type)) {
      doAfterReadFile(file, callback);
    }
  }

  function renderPhotosIfFilesIsValid(files) {
    for (var file in files) {
      if (files.hasOwnProperty(file)) {
        doIfFileIsValid(files[file], renderPhoto);
      }
    }
  }

  function doAfterReadFile(file, callback) {
    var fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.addEventListener('load', callback);
  }

  function createPhoto(evt) {
    var photo = document.createElement('div');
    photo.classList.add(dependencies.data.PHOTO_BLANK_CLASS);
    var img = document.createElement('img');
    img.setAttribute('draggable', true);
    img.addEventListener('dragstart', onImgDragStart);
    img.addEventListener('dragenter', onImgDragEnter);
    img.addEventListener('dragover', onImgDragOver);
    img.addEventListener('dragleave', onImgDragLeave);
    img.addEventListener('drop', onImgDrop);
    img.addEventListener('dragend', onImgDragEnd);
    img.style.cursor = 'move';
    img.style.width = dependencies.data.ImgSize.WIDTH + 'px';
    img.style.height = dependencies.data.ImgSize.HEIGHT + 'px';
    img.src = evt.target.result;
    photo.appendChild(img);
    return photo;
  }

  function onImgDragStart(evt) {
    dragSourceEl = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    dragSourceEl.style.opacity = dependencies.data.ImgStyle.OPACITY_ON;
    evt.dataTransfer.setData('src', dragSourceEl.src);
  }

  function onImgDragEnter(evt) {
    if (dragSourceEl !== evt.target) {
      evt.target.style.outline = dependencies.data.ImgStyle.OUTLINE_ON;
    }
    evt.preventDefault();
  }

  function onImgDragOver(evt) {
    evt.preventDefault();
  }

  function onImgDragLeave(evt) {
    evt.target.style.outline = dependencies.data.ImgStyle.OUTLINE_OFF;
  }

  function onImgDrop(evt) {
    var dragTargetEl = evt.target;
    if (dragSourceEl !== dragTargetEl) {
      dragSourceEl.src = dragTargetEl.src;
      dragTargetEl.src = evt.dataTransfer.getData('src');
      removeImgStyles();
    }
  }

  function onImgDragEnd(evt) {
    evt.target.style.opacity = dependencies.data.ImgStyle.OPACITY_OFF;
  }

  function renderAvatar(evt) {
    avatarContainer.src = evt.target.result;
  }

  function renderPhoto(evt) {
    var photo = createPhoto(evt);
    removeEmptyBlank();
    photosContainer.appendChild(photo);
  }

  function onAvatarInputChange() {
    var file = avatarInput.files[0];
    doIfFileIsValid(file, renderAvatar);
  }

  function onPhotoInputChange() {
    var files = photoInput.files;
    renderPhotosIfFilesIsValid(files);
  }

  function onAvatarDropZoneDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }

  function onPhotoDropZoneDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }

  function onAvatarDropZoneDrop(evt) {
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    doIfFileIsValid(file, renderAvatar);
  }

  function onPhotoDropZoneDrop(evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    renderPhotosIfFilesIsValid(files);
  }

  window.file = {
    onAvatarInputChange: onAvatarInputChange,
    onPhotoInputChange: onPhotoInputChange,
    onAvatarDropZoneDragOver: onAvatarDropZoneDragOver,
    onPhotoDropZoneDragOver: onPhotoDropZoneDragOver,
    onAvatarDropZoneDrop: onAvatarDropZoneDrop,
    onPhotoDropZoneDrop: onPhotoDropZoneDrop
  };
})();

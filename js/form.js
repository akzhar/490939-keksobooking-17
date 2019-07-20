'use strict';

(function () {
  var dependencies = {
    backend: window.backend,
    data: window.data,
    map: window.map,
    utils: window.utils,
    mainPin: window.mainPin,
    filter: window.filter,
    message: window.message,
    validation: window.validation,
    pin: window.pin,
    file: window.file
  };

  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var mapBlock = main.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var inputs = adForm.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var checkboxes = mapBlock.querySelectorAll('input[type="checkbox"]');
  var textarea = adForm.querySelector('textarea');
  var sumbitBtn = adForm.querySelector('.ad-form__submit');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var descriptionTextarea = adForm.querySelector('#description');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var features = adForm.querySelectorAll('input[name="features"]');
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var avatarInput = document.querySelector('#avatar');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');
  var photoInput = document.querySelector('#images');
  var avatarContainer = document.querySelector('.ad-form-header__preview > img');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  function onResetBtnClick(evt) {
    evt.preventDefault();
    makePageInactive();
  }

  function lock() {
    dependencies.utils.addAttributes(inputs, 'disabled', true);
    dependencies.utils.addAttributes(selects, 'disabled', true);
    dependencies.utils.addAttributes(checkboxes, 'disabled', true);
    textarea.setAttribute('disabled', true);
    sumbitBtn.setAttribute('disabled', true);
    adForm.classList.add(dependencies.data.FORM_DISABLED_CLASS);
    dependencies.filter.switchOff();
  }

  function clean() {
    titleInput.value = dependencies.data.DefaultValue.TITLE;
    typeSelect.value = dependencies.data.DefaultValue.TYPE;
    priceInput.value = dependencies.data.DefaultValue.PRICE;
    roomsSelect.value = dependencies.data.DefaultValue.ROOMS_GUESTS;
    dependencies.validation.onRoomsSelectChange();
    capacitySelect.value = dependencies.data.DefaultValue.ROOMS_GUESTS;
    descriptionTextarea.value = dependencies.data.DefaultValue.DESCRIPTION;
    timeInSelect.value = dependencies.data.DefaultValue.TIME_IN_OUT;
    timeOutSelect.value = dependencies.data.DefaultValue.TIME_IN_OUT;
    [].forEach.call(features, function (it) {
      it.checked = false;
    });
    avatarContainer.src = dependencies.data.MUFFIN_IMG_PATH;
    var imgs = photosContainer.querySelectorAll('.ad-form__photo');
    [].forEach.call(imgs, function (it) {
      photosContainer.removeChild(it);
    });
    var blank = document.createElement('div');
    blank.classList.add(dependencies.data.PHOTO_BLANK_CLASS);
    photosContainer.appendChild(blank);
  }

  function addSelectEventListeners() {
    typeSelect.addEventListener('change', dependencies.validation.onTypeSelectChange);
    timeInSelect.addEventListener('change', dependencies.validation.onTimeInSelectChange);
    timeOutSelect.addEventListener('change', dependencies.validation.onTimeOutSelectChange);
    roomsSelect.addEventListener('change', dependencies.validation.onRoomsSelectChange);
  }

  function removeSelectEventListeners() {
    typeSelect.removeEventListener('change', dependencies.validation.onTypeSelectChange);
    timeInSelect.removeEventListener('change', dependencies.validation.onTimeInSelectChange);
    timeOutSelect.removeEventListener('change', dependencies.validation.onTimeOutSelectChange);
    roomsSelect.removeEventListener('change', dependencies.validation.onRoomsSelectChange);
  }

  function makePageActive() {
    if (!mapBlock.classList.contains(dependencies.data.MAP_FADED_CLASS)) {
      return;
    }
    var renderedPins = dependencies.pin.render(dependencies.data.OFFERS);
    mapPins.appendChild(renderedPins);
    addSelectEventListeners();
    unlock();
    mapBlock.classList.remove(dependencies.data.MAP_FADED_CLASS);
    avatarDropZone.addEventListener('dragover', dependencies.file.onAvatarDropZoneDragOver);
    avatarDropZone.addEventListener('drop', dependencies.file.onAvatarDropZoneDrop);
    photoDropZone.addEventListener('dragover', dependencies.file.onPhotoDropZoneDragOver);
    photoDropZone.addEventListener('drop', dependencies.file.onPhotoDropZoneDrop);
    avatarInput.addEventListener('change', dependencies.file.onAvatarInputChange);
    photoInput.addEventListener('change', dependencies.file.onPhotoInputChange);
    resetBtn.addEventListener('click', onResetBtnClick);
    adForm.addEventListener('submit', onSubmit);
    window.addEventListener('resize', dependencies.map.updateLimits);
  }

  function makePageInactive() {
    clean();
    dependencies.map.clean();
    dependencies.mainPin.resetCoords();
    dependencies.mainPin.fillCenterCoordsInAddress();
    removeSelectEventListeners();
    lock();
    mapBlock.classList.add(dependencies.data.MAP_FADED_CLASS);
    avatarDropZone.removeEventListener('dragover', dependencies.file.onAvatarDropZoneDragOver);
    avatarDropZone.removeEventListener('drop', dependencies.file.onAvatarDropZoneDrop);
    photoDropZone.removeEventListener('dragover', dependencies.file.onPhotoDropZoneDragOver);
    photoDropZone.removeEventListener('drop', dependencies.file.onPhotoDropZoneDrop);
    avatarInput.removeEventListener('change', dependencies.file.onAvatarInputChange);
    photoInput.removeEventListener('change', dependencies.file.onPhotoInputChange);
    resetBtn.removeEventListener('click', onResetBtnClick);
    adForm.removeEventListener('submit', onSubmit);
    window.removeEventListener('resize', dependencies.map.updateLimits);
  }

  function onSuccess() {
    dependencies.message.isSuccessSave = true;
    dependencies.message.addWindowListeners();
    dependencies.message.showSuccess();
    makePageInactive();
  }

  function onError(msgText) {
    dependencies.message.isSuccessSave = false;
    dependencies.message.addWindowListeners();
    dependencies.message.showError(msgText, dependencies.message.removeWindowListeners);
  }

  function unlock() {
    dependencies.utils.removeAttributes(inputs, 'disabled');
    dependencies.utils.removeAttributes(selects, 'disabled');
    dependencies.utils.removeAttributes(checkboxes, 'disabled');
    textarea.removeAttribute('disabled');
    sumbitBtn.removeAttribute('disabled');
    adForm.classList.remove(dependencies.data.FORM_DISABLED_CLASS);
    dependencies.filter.switchOn();
  }

  function onSubmit(evt) {
    evt.preventDefault();
    dependencies.backend.load(onSuccess, onError, 'POST', new FormData(adForm));
  }

  window.form = {
    unlock: unlock,
    onSubmit: onSubmit,
    onResetBtnClick: onResetBtnClick,
    makePageActive: makePageActive
  };
})();

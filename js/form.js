'use strict';

(function () {
  var dependencies = {
    backend: window.backend,
    data: window.data,
    map: window.map,
    utils: window.utils,
    mainPin: window.mainPin,
    filter: window.filter,
    message: window.message
  };

  var FORM_DISABLED_CLASS = 'ad-form--disabled';
  var MAP_FADED_CLASS = 'map--faded';
  var main = document.querySelector('main');
  var adForm = main.querySelector('.ad-form');
  var mapBlock = main.querySelector('.map');
  var mapPinMain = mapBlock.querySelector('.map__pin--main');
  var inputs = adForm.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
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

  function lock() {
    dependencies.utils.addAttributes(inputs, 'disabled', true);
    dependencies.utils.addAttributes(selects, 'disabled', true);
    textarea.setAttribute('disabled', true);
    sumbitBtn.setAttribute('disabled', true);
    adForm.classList.add(FORM_DISABLED_CLASS);
    dependencies.filter.switchOff();
  }

  function clean() {
    titleInput.value = dependencies.data.Default.TITLE;
    typeSelect.value = dependencies.data.Default.TYPE;
    priceInput.value = dependencies.data.Default.PRICE;
    roomsSelect.value = dependencies.data.Default.ROOMS_GUESTS;
    capacitySelect.value = dependencies.data.Default.ROOMS_GUESTS;
    descriptionTextarea.value = dependencies.data.Default.DESCRIPTION;
    timeInSelect.value = dependencies.data.Default.TIME_IN_OUT;
    timeOutSelect.value = dependencies.data.Default.TIME_IN_OUT;
    [].forEach.call(features, function (it) {
      it.checked = false;
    });
  }

  function onSuccess() {
    dependencies.message.isSuccessSave = true;
    dependencies.message.addWindowListeners();
    clean();
    lock();
    dependencies.mainPin.resetCoords();
    dependencies.mainPin.fillCenterCoordsInAddress(mapPinMain);
    dependencies.map.clean();
    mapBlock.classList.add(MAP_FADED_CLASS);
    adForm.removeEventListener('load', onSubmit);
    window.removeEventListener('resize', dependencies.map.updateLimits);
    dependencies.message.showSuccess();
  }

  function onError(msgText) {
    dependencies.message.isSuccessSave = false;
    dependencies.message.addWindowListeners();
    dependencies.message.showError(msgText, dependencies.message.removeWindowListeners);
  }

  function unlock() {
    dependencies.utils.removeAttributes(inputs, 'disabled');
    dependencies.utils.removeAttributes(selects, 'disabled');
    textarea.removeAttribute('disabled');
    sumbitBtn.removeAttribute('disabled');
    adForm.classList.remove(FORM_DISABLED_CLASS);
    dependencies.filter.switchOn();
  }

  function onSubmit(evt) {
    evt.preventDefault();
    dependencies.backend.load(onSuccess, onError, 'POST', new FormData(adForm));
  }

  window.form = {
    unlock: unlock,
    onSubmit: onSubmit
  };
})();

'use strict';

(function () {
  var dependencies = {
    backend: window.backend,
    data: window.data,
    map: window.map,
    utils: window.utils,
    mainPin: window.mainPin
  };

  var isSuccessSave;
  var adForm = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var textarea = document.querySelector('textarea');
  var sumbitBtn = document.querySelector('.ad-form__submit');
  var main = document.querySelector('main');

  function unlockForm() {
    dependencies.utils.removeAttributes(inputs, 'disabled');
    dependencies.utils.removeAttributes(selects, 'disabled');
    textarea.removeAttribute('disabled');
    sumbitBtn.removeAttribute('disabled');
    adForm.classList.remove('ad-form--disabled');
  }

  function lockForm() {
    dependencies.utils.addAttributes(inputs, 'disabled', true);
    dependencies.utils.addAttributes(selects, 'disabled', true);
    textarea.setAttribute('disabled', true);
    sumbitBtn.setAttribute('disabled', true);
    adForm.classList.add('ad-form--disabled');
  }

  function clearFormData() {
    var Default = {
      title: '',
      type: 'flat',
      price: '',
      roomsAndGuests: '3',
      timeInOut: '12:00',
      description: ''
    };
    var titleInput = adForm.querySelector('#title');
    var priceInput = adForm.querySelector('#price');
    var descriptionTextarea = adForm.querySelector('#description');
    var typeSelect = adForm.querySelector('#type');
    var timeInSelect = adForm.querySelector('#timein');
    var timeOutSelect = adForm.querySelector('#timeout');
    var roomsSelect = adForm.querySelector('#room_number');
    var capacitySelect = adForm.querySelector('#capacity');
    var features = adForm.querySelectorAll('input[name="features"]');
    titleInput.value = Default.title;
    typeSelect.value = Default.type;
    priceInput.value = Default.price;
    roomsSelect.value = Default.roomsAndGuests;
    capacitySelect.value = Default.roomsAndGuests;
    descriptionTextarea.value = Default.description;
    timeInSelect.value = Default.timeInOut;
    timeOutSelect.value = Default.timeInOut;
    [].forEach.call(features, function (it) {
      it.checked = false;
    });
  }

  function getLinkToMsg() {
    var msgClass = (isSuccessSave) ? 'success' : 'error';
    var msg = main.querySelector('.' + msgClass);
    return msg;
  }

  function onEscKeyDown(evt) {
    var msg = getLinkToMsg();
    if (evt.keyCode === dependencies.data.ESC_KEYCODE) {
      main.removeChild(msg);
      window.removeEventListener('keydown', onEscKeyDown);
      window.removeEventListener('click', onWindowClick);
    }
  }

  function onWindowClick() {
    var msg = getLinkToMsg();
    main.removeChild(msg);
    window.removeEventListener('click', onWindowClick);
    window.removeEventListener('keydown', onEscKeyDown);
  }

  function onSuccess() {

    function showSuccessMsg() {
      var templateSuccess = document.getElementById('success').content.querySelector('.success');
      var msg = templateSuccess.cloneNode(true);
      window.addEventListener('keydown', onEscKeyDown);
      window.addEventListener('click', onWindowClick);
      main.appendChild(msg);
    }

    isSuccessSave = true;
    clearFormData();
    dependencies.mainPin.resetMainPinCoords();
    dependencies.mainPin.fillPinCenterCoordsInAddress(mapPinMain);
    dependencies.map.cleanMap();
    lockForm();
    mapBlock.classList.add('map--faded');
    adForm.removeEventListener('load', onFormSubmit);
    showSuccessMsg();
  }

  function onError(msgText) {
    isSuccessSave = false;
    var templateErr = document.getElementById('error').content.querySelector('.error');
    var msg = templateErr.cloneNode(true);
    var errMsg = msg.querySelector('.error__message');
    var errbtn = msg.querySelector('.error__button');
    errMsg.textContent = msgText;
    window.addEventListener('keydown', onEscKeyDown);
    window.addEventListener('click', onWindowClick);
    errbtn.addEventListener('click', function () {
      main.removeChild(msg);
      window.removeEventListener('keydown', onEscKeyDown);
      window.removeEventListener('click', onWindowClick);
    });
    main.appendChild(msg);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    dependencies.backend.save(new FormData(adForm), onSuccess, onError);
  }

  window.form = {
    unlockForm: unlockForm,
    onFormSubmit: onFormSubmit
  };
})();

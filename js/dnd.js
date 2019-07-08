'use strict';

(function () {
  var dependencies = {
    data: window.data,
    form: window.form,
    pin: window.pin,
    mainPin: window.mainPin,
    validation: window.validation,
    map: window.map
  };
  var MAP_FADED_CLASS = 'map--faded';
  var mapBlock = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = mapBlock.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');

  function addSelectEventListeners() {
    var typeSelect = adForm.querySelector('#type');
    var timeInSelect = adForm.querySelector('#timein');
    var timeOutSelect = adForm.querySelector('#timeout');
    var roomsSelect = adForm.querySelector('#room_number');
    typeSelect.addEventListener('change', dependencies.validation.onTypeSelectChange);
    timeInSelect.addEventListener('change', dependencies.validation.onTimeSelectChange);
    timeOutSelect.addEventListener('change', dependencies.validation.onTimeSelectChange);
    roomsSelect.addEventListener('change', dependencies.validation.onRoomSelectChange);
  }

  function onMapPinMainMouseUp() {
    if (!dependencies.data.OFFERS) {
      return;
    }
    if (!mapBlock.classList.contains(MAP_FADED_CLASS)) {
      return;
    }
    var renderedPins = dependencies.pin.renderPins(dependencies.data.OFFERS);
    mapPins.appendChild(renderedPins);
    addSelectEventListeners();
    dependencies.form.unlockForm();
    mapBlock.classList.remove(MAP_FADED_CLASS);
    adForm.addEventListener('submit', dependencies.form.onFormSubmit);
    window.addEventListener('resize', dependencies.map.updateMapLimits);
    // mapPinMain.removeEventListener('mouseup', onMapPinMainMouseUp);
  }

  function onMapPinMainMouseDown(evtMouseDown) {
    if (!dependencies.data.OFFERS) {
      return;
    }
    var currentCoords = {
      x: evtMouseDown.clientX,
      y: evtMouseDown.clientY,
    };
    var onDocumentMouseMove = function (evtMove) {
      var shift = {
        x: currentCoords.x - evtMove.clientX,
        y: currentCoords.y - evtMove.clientY
      };
      var pinMainTop = mapPinMain.offsetTop - shift.y;
      var pinMainLeft = mapPinMain.offsetLeft - shift.x;
      var pinHeight = mapPinMain.offsetHeight;
      var pinWidth = mapPinMain.offsetWidth;
      if (pinMainTop < (dependencies.data.MAP_LIMITS.yMin - pinHeight)) {
        pinMainTop = dependencies.data.MAP_LIMITS.yMin - pinHeight;
      }
      if (pinMainTop > (dependencies.data.MAP_LIMITS.yMax - pinHeight)) {
        pinMainTop = dependencies.data.MAP_LIMITS.yMax - pinHeight;
      }
      if (pinMainLeft < (dependencies.data.MAP_LIMITS.xMin - pinWidth / 2)) {
        pinMainLeft = dependencies.data.MAP_LIMITS.xMin - pinWidth / 2;
      }
      if (pinMainLeft > (dependencies.data.MAP_LIMITS.xMax - pinWidth / 2)) {
        pinMainLeft = dependencies.data.MAP_LIMITS.xMax - pinWidth / 2;
      }
      currentCoords.x = evtMove.clientX;
      currentCoords.y = evtMove.clientY;
      mapPinMain.style.top = pinMainTop + 'px';
      mapPinMain.style.left = pinMainLeft + 'px';
    };
    var onDocumentMouseUp = function () {
      dependencies.mainPin.fillPinCoordsInAddress(mapPinMain);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }

  window.dnd = {
    onMapPinMainMouseDown: onMapPinMainMouseDown,
    onMapPinMainMouseUp: onMapPinMainMouseUp
  };
})();

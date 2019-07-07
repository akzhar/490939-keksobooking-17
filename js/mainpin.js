'use strict';

(function () {
  var dependencies = {
    data: window.data,
    apartments: window.apartments,
    form: window.form
  };
  var mapBlock = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  function calculatePinCoords(pinObj) {
    var pinCoords = {
      x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
      y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight)
    };
    return pinCoords;
  }

  function fillPinCoordsInAddress(pinObj) {
    var addressInput = document.querySelector('#address');
    var pinCoords = calculatePinCoords(pinObj);
    addressInput.value = pinCoords.x + ', ' + pinCoords.y;
  }

  function updateMapLimits() {
    dependencies.data.MAP_LIMITS.xMax = mapBlock.offsetWidth;
  }

  function onMapPinMainMouseUp() {
    var adForm = document.querySelector('.ad-form');
    var typeSelect = adForm.querySelector('#type');
    var timeInSelect = adForm.querySelector('#timein');
    var timeOutSelect = adForm.querySelector('#timeout');

    // объединить в 1
    dependencies.apartments.renderApartments(dependencies.data.renderedPins);
    dependencies.apartments.renderApartments(dependencies.data.renderedCards);

    typeSelect.addEventListener('change', dependencies.form.onTypeSelectChanged);
    timeInSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
    timeOutSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
    dependencies.form.unlockForm();
    mapBlock.classList.remove('map--faded');

    mapPinMain.removeEventListener('mouseup', window.pin.onMapPinMainMouseUp);
  }

  function onMapPinMainMouseDown(evtMouseDown) {
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
      fillPinCoordsInAddress(mapPinMain);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }

  window.mainPin = {
    onMapPinMainMouseDown: onMapPinMainMouseDown,
    onMapPinMainMouseUp: onMapPinMainMouseUp,
    updateMapLimits: updateMapLimits
  };
})();

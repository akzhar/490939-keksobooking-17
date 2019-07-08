'use strict';

(function () {
  var dependencies = {
    data: window.data,
    validation: window.validation
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function resetMainPinCoords() {
    mapPinMain.style.top = dependencies.data.PIN_START_COORDS.x + 'px';
    mapPinMain.style.left = dependencies.data.PIN_START_COORDS.y + 'px';
  }

  function calculatePinCenterCoords(pinObj) {
    var pinCenterCoords = {
      x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
      y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight / 2)
    };
    return pinCenterCoords;
  }

  function calculatePinCoords(pinObj) {
    var pinCoords = {
      x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
      y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight)
    };
    return pinCoords;
  }

  function fillPinCenterCoordsInAddress(pinObj) {
    var pinCenterCoords = calculatePinCenterCoords(pinObj);
    addressInput.value = pinCenterCoords.x + ', ' + pinCenterCoords.y;
  }

  function fillPinCoordsInAddress(pinObj) {
    var pinCoords = calculatePinCoords(pinObj);
    addressInput.value = pinCoords.x + ', ' + pinCoords.y;
  }
  window.mainPin = {
    fillPinCenterCoordsInAddress: fillPinCenterCoordsInAddress,
    fillPinCoordsInAddress: fillPinCoordsInAddress,
    resetMainPinCoords: resetMainPinCoords
  };
})();

'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var POSITION_UNIT = 'px';
  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function resetCoords() {
    pinMain.style.top = dependencies.data.PinStart.X + POSITION_UNIT;
    pinMain.style.left = dependencies.data.PinStart.Y + POSITION_UNIT;
  }

  function getPinCenterCoords(pinObj) {
    var pinCenterCoords = {
      x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
      y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight / 2)
    };
    return pinCenterCoords;
  }

  function getPinCoords(pinObj) {
    var pinCoords = {
      x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
      y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight)
    };
    return pinCoords;
  }

  function fillCenterCoordsInAddress(pinObj) {
    var pinCenterCoords = getPinCenterCoords(pinObj);
    addressInput.value = pinCenterCoords.x + ', ' + pinCenterCoords.y;
  }

  function fillCoordsInAddress(pinObj) {
    var pinCoords = getPinCoords(pinObj);
    addressInput.value = pinCoords.x + ', ' + pinCoords.y;
  }
  window.mainPin = {
    fillCenterCoordsInAddress: fillCenterCoordsInAddress,
    fillCoordsInAddress: fillCoordsInAddress,
    resetCoords: resetCoords
  };
})();

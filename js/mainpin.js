'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function resetCoords() {
    pinMain.style.top = dependencies.data.PinStartCoordinate.X + dependencies.data.POSITION_UNIT;
    pinMain.style.left = dependencies.data.PinStartCoordinate.Y + dependencies.data.POSITION_UNIT;
  }

  function getPinCenterCoords() {
    var pinCenterCoords = {
      x: Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2),
      y: Math.floor(pinMain.offsetTop + pinMain.offsetHeight / 2)
    };
    return pinCenterCoords;
  }

  function getPinCoords() {
    var pinCoords = {
      x: Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2),
      y: Math.floor(pinMain.offsetTop + pinMain.offsetHeight)
    };
    return pinCoords;
  }

  function fillCenterCoordsInAddress() {
    var pinCenterCoords = getPinCenterCoords();
    addressInput.value = pinCenterCoords.x + ', ' + pinCenterCoords.y;
  }

  function fillCoordsInAddress() {
    var pinCoords = getPinCoords();
    addressInput.value = pinCoords.x + ', ' + pinCoords.y;
  }
  window.mainPin = {
    fillCenterCoordsInAddress: fillCenterCoordsInAddress,
    fillCoordsInAddress: fillCoordsInAddress,
    resetCoords: resetCoords
  };
})();

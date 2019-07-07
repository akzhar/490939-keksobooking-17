'use strict';

(function () {
  var dependencies = {
    mainPin: window.mainPin
  };
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', dependencies.mainPin.onMapPinMainMouseDown);
  mapPinMain.addEventListener('mouseup', dependencies.mainPin.onMapPinMainMouseUp);
  window.addEventListener('resize', dependencies.mainPin.updateMapLimits);
})();

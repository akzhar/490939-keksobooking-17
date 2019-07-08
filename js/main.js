'use strict';

(function () {
  var dependencies = {
    dnd: window.dnd,
    mainPin: window.mainPin
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  dependencies.mainPin.fillPinCenterCoordsInAddress(mapPinMain);
  mapPinMain.addEventListener('mousedown', dependencies.dnd.onMapPinMainMouseDown);
  mapPinMain.addEventListener('mouseup', dependencies.dnd.onMapPinMainMouseUp);
})();

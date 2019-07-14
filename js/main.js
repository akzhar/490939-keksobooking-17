'use strict';

(function () {
  var dependencies = {
    dnd: window.dnd,
    mainPin: window.mainPin
  };

  var mainPin = document.querySelector('.map__pin--main');

  dependencies.mainPin.fillCenterCoordsInAddress(mainPin);
  mainPin.addEventListener('mousedown', dependencies.dnd.onMainPinMouseDown);
  mainPin.addEventListener('keydown', dependencies.dnd.onMainPinEnterKeyDown);
})();

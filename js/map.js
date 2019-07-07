'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  function cleanMap() {
    var mapPins = mapBlock.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        mapPins.removeChild(pin);
      }
    });
  }

  window.map = {
    cleanMap: cleanMap
  };
})();

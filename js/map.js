'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  window.map = {
    cleanMap: function () {
      var mapPins = mapBlock.querySelector('.map__pins');
      var pins = mapPins.querySelectorAll('.map__pin');
      pins.forEach(function (pin) {
        mapPins.removeChild(pin);
      });
    }
  };
})();

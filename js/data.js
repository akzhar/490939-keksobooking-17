'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  window.data = {
    NUMBER_OF_OFFERS: 8,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MIN_PRICES: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    MAP_LIMITS: {
      xMin: 0,
      xMax: mapBlock.offsetWidth,
      yMin: 130,
      yMax: 630,
    }
  };
})();

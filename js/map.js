'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');

  function cleanMap() {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        mapPins.removeChild(pin);
      }
    });
    cleanCards();
  }

  function cleanCards() {
    var cards = mapPins.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      mapPins.removeChild(card);
    });
  }

  function updateMapLimits() {
    dependencies.data.MAP_LIMITS.xMax = mapBlock.offsetWidth;
  }

  window.map = {
    updateMapLimits: updateMapLimits,
    cleanMap: cleanMap,
    cleanCards: cleanCards
  };
})();

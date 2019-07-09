'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var MAIN_PIN_CLASS = 'map__pin--main';
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');

  function clean() {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains(MAIN_PIN_CLASS)) {
        mapPins.removeChild(pin);
      }
    });
    removeCards();
  }

  function removeCards() {
    var cards = mapPins.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      mapPins.removeChild(card);
    });
  }

  function updateLimits() {
    dependencies.data.MapLimit.X_MAX = mapBlock.offsetWidth;
  }

  window.map = {
    clean: clean,
    updateLimits: updateLimits,
    removeCards: removeCards
  };
})();

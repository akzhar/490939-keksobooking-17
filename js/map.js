'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');

  function clean() {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains(dependencies.data.MAIN_PIN_CLASS)) {
        mapPins.removeChild(pin);
      }
    });
    removeCard();
  }

  function removeCard() {
    var card = mapPins.querySelector('.map__card');
    if (card === null) {
      return;
    }
    mapPins.removeChild(card);
  }

  function removePinActiveClass() {
    var pin = mapPins.querySelector('.' + dependencies.data.ACTIVE_PIN_CLASS);
    if (pin === null) {
      return;
    }
    pin.classList.remove(dependencies.data.ACTIVE_PIN_CLASS);
  }

  function updateLimits() {
    dependencies.data.MapLimit.X_MAX = mapBlock.offsetWidth;
  }

  window.map = {
    clean: clean,
    updateLimits: updateLimits,
    removeCard: removeCard,
    removePinActiveClass: removePinActiveClass
  };
})();

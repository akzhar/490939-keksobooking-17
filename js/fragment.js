'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  function getRenderedPins(apartments) {
    var fragment = document.createDocumentFragment();
    var PINS_COUNT_LIMIT = 5;

    function renderPin(apartment, i) {
      if (i >= PINS_COUNT_LIMIT) {
        return;
      }
      var pin = createPin(apartment);
      fragment.appendChild(pin);
    }

    apartments.forEach(renderPin);
    return fragment;
  }

  function createPin(apartment) {
    var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
    var pin = templatePin.cloneNode(true);
    var pinImg = pin.querySelector('img');
    var pinX = apartment.location.x - dependencies.data.PIN_WIDTH / 2;
    var pinY = apartment.location.y - dependencies.data.PIN_HEIGHT;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';
    pinImg.src = apartment.author.avatar;
    pinImg.alt = 'заголовок объявления'; // to be filled in the future
    return pin;
  }

  window.fragment = {
    getRenderedPins: getRenderedPins
  };
})();

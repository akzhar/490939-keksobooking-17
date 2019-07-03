'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  function renderPins(apartments) {
    var fragment = document.createDocumentFragment();
    var PINS_COUNT_LIMIT = 5;
    for (var i = 0; i < apartments.length && i < PINS_COUNT_LIMIT; i++) {
      var pin = createPin(apartments[i]);
      fragment.appendChild(pin);
    }
    return fragment;
  }

  function createPin(apartment) {
    var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
    var pin = templatePin.cloneNode(true);
    var pinImg = pin.querySelector('img');
    var pinX = apartment.location.x - Pin.WIDTH / 2;
    var pinY = apartment.location.y - Pin.HEIGHT;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';
    pinImg.src = apartment.author.avatar;
    pinImg.alt = 'заголовок объявления'; // to be filled in the future
    return pin;
  }

  window.pin = {
    renderPins: renderPins
  };
})();

'use strict';

(function () {
  var dependencies = {
    data: window.data,
    card: window.card
  };

  function renderPins(apartments) {
    var fragment = document.createDocumentFragment();
    var PINS_COUNT_LIMIT = 5;
    for (var i = 0; i < apartments.length && i < PINS_COUNT_LIMIT; i++) {
      var pin = createPin(apartments[i], i);
      fragment.appendChild(pin);
    }
    return fragment;
  }

  function createPin(apartment) {
    var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
    var pin = templatePin.cloneNode(true);
    var pinImg = pin.querySelector('img');
    var pinX = apartment.location.x - dependencies.data.PIN_SIZE.WIDTH / 2;
    var pinY = apartment.location.y - dependencies.data.PIN_SIZE.HEIGHT;
    var title = apartment.offer.title;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';
    pinImg.src = apartment.author.avatar;
    pinImg.alt = title;
    pin.addEventListener('click', function () {
      dependencies.card.openPopup(title);
    });
    return pin;
  }

  window.pin = {
    renderPins: renderPins
  };
})();

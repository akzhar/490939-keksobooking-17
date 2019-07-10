'use strict';

(function () {
  var dependencies = {
    data: window.data,
    card: window.card
  };

  var POSITION_UNIT = 'px';
  var PINS_COUNT_LIMIT = 5;
  var ACTIVE_PIN_CLASS = 'map__pin--active';
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  function render(apartments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(apartments.length, PINS_COUNT_LIMIT); i++) {
      var apartment = apartments[i];
      var pin = create(apartment, i);
      dependencies.data.renderedOffers[i] = apartment;
      fragment.appendChild(pin);
    }
    return fragment;
  }

  function create(apartment, i) {
    var pin = templatePin.cloneNode(true);
    var pinImg = pin.querySelector('img');
    var pinX = apartment.location.x - dependencies.data.PinSize.WIDTH / 2;
    var pinY = apartment.location.y - dependencies.data.PinSize.HEIGHT;
    var title = apartment.offer.title;
    pin.style.left = pinX + POSITION_UNIT;
    pin.style.top = pinY + POSITION_UNIT;
    pinImg.src = apartment.author.avatar;
    pinImg.alt = title;
    pin.addEventListener('click', function () {
      pin.classList.add(ACTIVE_PIN_CLASS);
      dependencies.card.open(i);
    });
    return pin;
  }

  window.pin = {
    render: render
  };
})();

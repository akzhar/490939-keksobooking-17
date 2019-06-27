'use strict';

(function () {
  var dependencies = {
    data: window.data,
    utils: window.utils
  };
  var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
  var mapBlock = document.querySelector('.map');

  function createApartments(n) {
    var apartments = [];
    for (var i = 0; i < n; i++) {
      apartments[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: dependencies.utils.getRandomKeyInObject(dependencies.data.MIN_PRICES)
        },

        location: {
          x: dependencies.utils.getRandomNumber(dependencies.data.MAP_LIMITS.xMin, dependencies.data.MAP_LIMITS.xMax),
          y: dependencies.utils.getRandomNumber(dependencies.data.MAP_LIMITS.yMin, dependencies.data.MAP_LIMITS.yMax)
        }
      };
    }
    return apartments;
  }

  function renderPin(apartment) {
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

  function getFragmentWithPins(apartments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < apartments.length; i++) {
      var pin = renderPin(apartments[i]);
      fragment.appendChild(pin);
    }
    return fragment;
  }

  function generateApartments() {
    var apartments = createApartments(dependencies.data.NUMBER_OF_OFFERS);
    var fragment = getFragmentWithPins(apartments);
    var mapPins = mapBlock.querySelector('.map__pins');
    mapPins.appendChild(fragment);
  }

  window.apartments = {
    generateApartments: generateApartments
  };
})();

'use strict';

var NUMBER_OF_OFFERS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapBlock = document.querySelector('.map');
var mapPins = mapBlock.querySelector('.map__pins');
var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
var apartmentTypes = ['palace', 'flat', 'house', 'bungalo'];

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function createSimmilarOffers(n) {
  var simmilarOffers = [];
  for (var i = 0; i < n; i++) {
    var offer = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: apartmentTypes[getRandom(0, apartmentTypes.length - 1)]
      },

      location: {
        x: getRandom(0, 1200),
        y: getRandom(130, 630)
      }
    };
    simmilarOffers.push(offer);
  }
  return simmilarOffers;
}

function fillInPinCards(offers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var pin = templatePin.cloneNode(true);
    var pinImg = pin.querySelector('img');
    var pinX = offers[i].location.x - PIN_WIDTH / 2;
    var pinY = offers[i].location.y - PIN_HEIGHT;
    pin.style = ' left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinImg.src = offers[i].author.avatar;
    pinImg.alt = 'заголовок объявления'; // видимо, будет где-то дальше
    fragment.appendChild(pin);
  }
  return fragment;
}

var simmilarOffers = createSimmilarOffers(NUMBER_OF_OFFERS);
var simmilarOffersCards = fillInPinCards(simmilarOffers);

mapBlock.classList.remove('map--faded');
mapPins.appendChild(simmilarOffersCards);

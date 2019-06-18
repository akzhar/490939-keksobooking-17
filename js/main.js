'use strict';

var NUMBER_OF_OFFERS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');


function getRandomApartmentType(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function createApartments(n) {
  var apartments = [];
  for (var i = 0; i < n; i++) {
    apartments[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: getRandomApartmentType(APARTMENT_TYPES)
      },

      location: {
        x: getRandomNumber(0, 1200),
        y: getRandomNumber(130, 630)
      }
    };
  }
  return apartments;
}

function renderPin(apartment) {
  var pin = templatePin.cloneNode(true);
  var pinImg = pin.querySelector('img');
  var pinX = apartment.location.x - PIN_WIDTH / 2;
  var pinY = apartment.location.y - PIN_HEIGHT;
  pin.style.left = pinX + 'px';
  pin.style.top = pinY + 'px';
  pinImg.src = apartment.author.avatar;
  pinImg.alt = 'заголовок объявления'; // видимо, будет где-то дальше
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

function removeAttributes(objectsArr, attributeStr) {
  for (var i = 0; i < objectsArr.length; i++) {
    objectsArr[i].removeAttribute(attributeStr);
  }
}

function unlockForm() {
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var sumbitBtn = document.querySelector('.ad-form__submit');
  removeAttributes(inputs, 'disabled');
  removeAttributes(selects, 'disabled');
  sumbitBtn.removeAttribute('disabled');
}

function setAddressCoordinates(pinObj) {
  var addressInput = document.querySelector('#address');
  var x = pinObj.style.left.slice(0, -2);
  var y = pinObj.style.top.slice(0, -2);
  addressInput.value = x + ', ' + y;
}

function mapPinMainClickHandler() {
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPins = mapBlock.querySelector('.map__pins');
  var apartments = createApartments(NUMBER_OF_OFFERS);
  var fragment = getFragmentWithPins(apartments);
  mapPins.appendChild(fragment);
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  unlockForm();
  setAddressCoordinates(mapPinMain);
}

mapPinMain.addEventListener('click', mapPinMainClickHandler);

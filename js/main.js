'use strict';

var NUMBER_OF_OFFERS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var APARTMENTS = [
  {
    type: 'palace',
    minPrice: 10000
  },
  {
    type: 'flat',
    minPrice: 1000
  },
  {
    type: 'house',
    minPrice: 5000
  },
  {
    type: 'bungalo',
    minPrice: 0
  },
];
var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var mapBlock = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapPins = mapBlock.querySelector('.map__pins');
var typeSelect = adForm.querySelector('#type');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');
var priceInput = adForm.querySelector('#price');

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
        type: APARTMENTS[getRandomNumber(0, APARTMENTS.length - 1)].type
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

function removeAttributes(objectsArr, attributeStr) {
  for (var i = 0; i < objectsArr.length; i++) {
    objectsArr[i].removeAttribute(attributeStr);
  }
}

function unlockForm() {
  var inputs = document.querySelectorAll('input');
  var selects = document.querySelectorAll('select');
  var textarea = document.querySelector('textarea');
  var sumbitBtn = document.querySelector('.ad-form__submit');
  removeAttributes(inputs, 'disabled');
  removeAttributes(selects, 'disabled');
  textarea.removeAttribute('disabled');
  sumbitBtn.removeAttribute('disabled');
  adForm.classList.remove('ad-form--disabled');
}

function calculatepinCenter(pinObj) {
  var pinCenter = {
    x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
    y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight / 2)
  };
  return pinCenter;
}

function fillPinCenterInAddress(pinObj) {
  var addressInput = document.querySelector('#address');
  var pinCenter = calculatepinCenter(pinObj);
  addressInput.value = pinCenter.x + ', ' + pinCenter.y;
}

function onMapPinMainClick() {
  var apartments = createApartments(NUMBER_OF_OFFERS);
  var fragment = getFragmentWithPins(apartments);
  mapPins.appendChild(fragment);
  mapBlock.classList.remove('map--faded');
  unlockForm();
  fillPinCenterInAddress(mapPinMain);
  mapPinMain.removeEventListener('click', onMapPinMainClick);
}

function onTypeSelectChanged() {
  var selectedOptionIndex = typeSelect.selectedIndex;
  var selectedOption = typeSelect.querySelectorAll('option')[selectedOptionIndex];
  var selectedAppartment = APARTMENTS.filter(function(apartment) {
    return apartment.type === selectedOption.value;
  });
  var minPrice = selectedAppartment[0].minPrice;
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
}

function onTimeInOutSelectChange(evt) {
  var connectedSelect = (evt.target === timeInSelect) ? timeOutSelect : timeInSelect;
  var selectedOptionIndex = evt.target.selectedIndex;
  connectedSelect.selectedIndex = selectedOptionIndex;
}

mapPinMain.addEventListener('click', onMapPinMainClick);
typeSelect.addEventListener('change', onTypeSelectChanged);
timeInSelect.addEventListener('change', onTimeInOutSelectChange);
timeOutSelect.addEventListener('change', onTimeInOutSelectChange);

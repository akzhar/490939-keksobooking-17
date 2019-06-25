'use strict';

var NUMBER_OF_OFFERS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PRICES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var mapBlock = document.querySelector('.map');
var MAP_LIMITS = {
  xMin: 0,
  xMax: mapBlock.offsetWidth,
  yMin: 130,
  yMax: 630,
};
var templatePin = document.getElementById('pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var typeSelect = adForm.querySelector('#type');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');
var priceInput = adForm.querySelector('#price');

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomKeyInObject(arr) {
  var keys = Object.keys(arr);
  var key = keys[getRandomNumber(0, keys.length - 1)];
  return key;
}

function createApartments(n) {
  var apartments = [];
  for (var i = 0; i < n; i++) {
    apartments[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: getRandomKeyInObject(MIN_PRICES)
      },

      location: {
        x: getRandomNumber(MAP_LIMITS.xMin, MAP_LIMITS.xMax),
        y: getRandomNumber(MAP_LIMITS.yMin, MAP_LIMITS.yMax)
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

function calculatePinCoords(pinObj) {
  var pinCoords = {
    x: Math.floor(pinObj.offsetLeft + pinObj.offsetWidth / 2),
    y: Math.floor(pinObj.offsetTop + pinObj.offsetHeight)
  };
  return pinCoords;
}

function fillPinCoordsInAddress(pinObj) {
  var addressInput = document.querySelector('#address');
  var pinCoords = calculatePinCoords(pinObj);
  addressInput.value = pinCoords.x + ', ' + pinCoords.y;
}

function onTypeSelectChanged() {
  var selectedOptionIndex = typeSelect.selectedIndex;
  var selectedOption = typeSelect.querySelectorAll('option')[selectedOptionIndex];
  var minPrice = MIN_PRICES[selectedOption.value];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
}

function onTimeInOutSelectChange(evt) {
  var connectedSelect = (evt.target === timeInSelect) ? timeOutSelect : timeInSelect;
  var selectedOptionIndex = evt.target.selectedIndex;
  connectedSelect.selectedIndex = selectedOptionIndex;
}

function generateApartments() {
  var apartments = createApartments(NUMBER_OF_OFFERS);
  var fragment = getFragmentWithPins(apartments);
  var mapPins = mapBlock.querySelector('.map__pins');
  mapPins.appendChild(fragment);
}

function updateMapLimits() {
  MAP_LIMITS.xMax = mapBlock.offsetWidth;
}

function onMapPinMainMouseUp() {
  generateApartments();
  unlockForm();
  mapBlock.classList.remove('map--faded');
  mapPinMain.removeEventListener('mouseup', onMapPinMainMouseUp);
}

function onMapPinMainMouseDown(evtMouseDown) {
  var currentCoords = {
    x: evtMouseDown.clientX,
    y: evtMouseDown.clientY,
  };
  var onDocumentMouseMove = function (evtMove) {
    var shift = {
      x: currentCoords.x - evtMove.clientX,
      y: currentCoords.y - evtMove.clientY
    };
    var pinMainTop = mapPinMain.offsetTop - shift.y;
    var pinMainLeft = mapPinMain.offsetLeft - shift.x;
    var pinHeight = mapPinMain.offsetHeight;
    var pinWidth = mapPinMain.offsetWidth;
    if (pinMainTop < (MAP_LIMITS.yMin - pinHeight)) {
      pinMainTop = MAP_LIMITS.yMin - pinHeight;
    }
    if (pinMainTop > (MAP_LIMITS.yMax - pinHeight)) {
      pinMainTop = MAP_LIMITS.yMax - pinHeight;
    }
    if (pinMainLeft < (MAP_LIMITS.xMin - pinWidth / 2)) {
      pinMainLeft = MAP_LIMITS.xMin - pinWidth / 2;
    }
    if (pinMainLeft > (MAP_LIMITS.xMax - pinWidth / 2)) {
      pinMainLeft = MAP_LIMITS.xMax - pinWidth / 2;
    }
    currentCoords.x = evtMove.clientX;
    currentCoords.y = evtMove.clientY;
    mapPinMain.style.top = pinMainTop + 'px';
    mapPinMain.style.left = pinMainLeft + 'px';
  };
  var onDocumentMouseUp = function () {
    fillPinCoordsInAddress(mapPinMain);
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  };
  document.addEventListener('mousemove', onDocumentMouseMove);
  document.addEventListener('mouseup', onDocumentMouseUp);
}

mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);
mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
typeSelect.addEventListener('change', onTypeSelectChanged);
timeInSelect.addEventListener('change', onTimeInOutSelectChange);
timeOutSelect.addEventListener('change', onTimeInOutSelectChange);
window.addEventListener('resize', updateMapLimits);

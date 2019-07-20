'use strict';

(function () {
  var dependencies = {
    backend: window.backend,
    message: window.message
  };

  var mapBlock = document.querySelector('.map');

  function onError(msgText) {
    dependencies.message.showError(msgText, load);
  }

  function onSuccess(data) {
    window.data.OFFERS = data;
  }

  function load() {
    dependencies.backend.load(onSuccess, onError, 'GET');
  }

  dependencies.message.render();
  load();

  window.data = {
    renderedOffers: {},
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    PINS_COUNT_LIMIT: 5,
    DefaultValue: {
      TITLE: '',
      TYPE: 'flat',
      PRICE: '',
      ROOMS_GUESTS: '3',
      TIME_IN_OUT: '12:00',
      DESCRIPTION: ''
    },
    Translation: {
      PALACE: 'Дворец',
      FLAT: 'Квартира',
      HOUSE: 'Дом',
      BUNGALO: 'Бунгало'
    },
    MinPrice: {
      PALACE: 10000,
      FLAT: 1000,
      HOUSE: 5000,
      BUNGALO: 0
    },
    MapLimit: {
      X_MIN: 0,
      X_MAX: mapBlock.offsetWidth,
      Y_MIN: 130,
      Y_MAX: 630,
    },
    PinStartCoordinate: {
      X: 375,
      Y: 570
    },
    PinSize: {
      WIDTH: 50,
      HEIGHT: 70
    },
    PhotoSize: {
      WIDTH: 45,
      HEIGHT: 40
    },
    MUFFIN_IMG_PATH: 'img/muffin-grey.svg',
    ImgSize: {
      WIDTH: 70,
      HEIGHT: 70
    },
    ImgStyle: {
      OPACITY_ON: '0.4',
      OPACITY_OFF: '1.0',
      OUTLINE_ON: '2px solid #ffaa99',
      OUTLINE_OFF: 'none'
    },
    VALID_IMG_TYPES: [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/svg'
    ],
    PHOTO_BLANK_CLASS: 'ad-form__photo',
    FORM_DISABLED_CLASS: 'ad-form--disabled',
    MAP_FADED_CLASS: 'map--faded',
    FEATURE_CLASS: 'popup__feature',
    PHOTO_CLASS: 'popup__photo',
    ACTIVE_PIN_CLASS: 'map__pin--active',
    MAIN_PIN_CLASS: 'map__pin--main',
    PRICE_UNIT: ' ₽/ночь',
    POSITION_UNIT: 'px',
    FILTER_ANY_VALUE: 'any',
    CAPACITY_VALUE_EXCEPTION: '0',
    ROOMS_VALUE_EXCEPTION: '100',
    DISABLED_ATTRIBUTE: 'disabled',
    IdToKey: {
      'housing-type': 'TYPE',
      'housing-price': 'PRICE',
      'housing-rooms': 'ROOMS',
      'housing-guests': 'GUESTS',
      'filter-wifi': 'WIFI',
      'filter-dishwasher': 'DISHWASHER',
      'filter-parking': 'PARKING',
      'filter-washer': 'WASHER',
      'filter-elevator': 'ELEVATOR',
      'filter-conditioner': 'CONDITIONER'
    },
    PriceLimit: {
      LOW: {
        FROM: 0,
        TO: 10000
      },
      MIDDLE: {
        FROM: 10000,
        TO: 50000
      },
      HIGH: {
        FROM: 50000,
        TO: Infinity
      }
    }
  };
})();

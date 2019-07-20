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
    Default: {
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
    PinStart: {
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
    DEFAULT_MUFFIN_IMG_PATH: 'img/muffin-grey.svg',
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
    PHOTO_BLANK_CLASS: 'ad-form__photo'
  };
})();

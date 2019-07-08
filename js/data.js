'use strict';

(function () {
  var dependencies = {
    backend: window.backend
  };

  var mapBlock = document.querySelector('.map');

  function onError(msgText) {
    var main = document.querySelector('main');
    var templateErr = document.getElementById('error').content.querySelector('.error');
    var msg = templateErr.cloneNode(true);
    var errMsg = msg.querySelector('.error__message');
    var errbtn = msg.querySelector('.error__button');
    errMsg.textContent = msgText;
    errbtn.addEventListener('click', function () {
      main.removeChild(msg);
      loadData();
    });
    main.appendChild(msg);
  }

  function onSuccess(data) {
    window.data.OFFERS = data;
  }

  function loadData() {
    dependencies.backend.load(onSuccess, onError);
  }

  loadData();

  window.data = {
    MIN_PRICES: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    },
    MAP_LIMITS: {
      xMin: 0,
      xMax: mapBlock.offsetWidth,
      yMin: 130,
      yMax: 630,
    },
    ESC_KEYCODE: 27,
    PIN_START_COORDS: {
      x: 375,
      y: 570
    },
    PIN_SIZE: {
      WIDTH: 50,
      HEIGHT: 70
    }
  };
})();

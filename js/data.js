'use strict';

(function () {
  var dependencies = {
    pin: window.pin,
    backend: window.backend
  };

  var mapBlock = document.querySelector('.map');

  function onError(msgText) {
    var main = document.querySelector('main');
    var templateErr = document.getElementById('error').content.querySelector('.error');
    var err = templateErr.cloneNode(true);
    var errMsg = err.querySelector('.error__message');
    errMsg.textContent = msgText;
    main.appendChild(err);
  }

  function onSuccess(data) {
    window.data.offers = data;
    window.data.renderedPins = dependencies.pin.renderPins(data);
  }

  dependencies.backend.load(onSuccess, onError);

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
    }
  };
})();

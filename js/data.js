'use strict';

(function () {
  var dependencies = {
    backend: window.backend
  };

  var mapBlock = document.querySelector('.map');

  function onError(msgText) {
    var main = document.querySelector('main');
    var templateErr = document.getElementById('error').content.querySelector('.error');
    var err = templateErr.cloneNode(true);
    var errMsg = err.querySelector('.error__message');
    var errbtn = err.querySelector('.error__button');
    errMsg.textContent = msgText;
    errbtn.addEventListener('click', function () {
      main.removeChild(err);
      loadData();
    });
    main.appendChild(err);
  }

  function onSuccess(data) {
    // console.log('Success!!!'); // delete this row
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
    }
  };
})();

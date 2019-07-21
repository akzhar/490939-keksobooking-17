'use strict';

(function () {
  var dependencies = {
    backend: window.backend,
    data: window.data,
    message: window.message,
    dnd: window.dnd,
    mainPin: window.mainPin
  };

  var mainPin = document.querySelector('.map__pin--main');

  function onError(msgText) {
    dependencies.message.showError(msgText, loadOffers);
  }

  function onSuccess(data) {
    dependencies.data.OFFERS = data;
  }

  function loadOffers() {
    dependencies.backend.load(onSuccess, onError, 'GET');
  }

  dependencies.message.render();
  loadOffers();
  dependencies.mainPin.fillCenterCoordsInAddress(mainPin);
  mainPin.addEventListener('mousedown', dependencies.dnd.onMainPinMouseDown);
  mainPin.addEventListener('keydown', dependencies.dnd.onMainPinEnterKeyDown);
})();

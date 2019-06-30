'use strict';

(function () {
  var dependencies = {
    form: window.form,
    pin: window.pin,
    fragment: window.fragment,
    backend: window.backend
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  function onError(msgText) {
    var main = document.querySelector('main');
    var templateErr = document.getElementById('error').content.querySelector('.error');
    var err = templateErr.cloneNode(true);
    var errMsg = err.querySelector('.error__message');
    errMsg.textContent = msgText;
    main.appendChild(err);
  }

  function onSuccess(data) {
    window.renderedPins = dependencies.fragment.getRenderedPins(data);
  }

  mapPinMain.addEventListener('mousedown', dependencies.pin.onMapPinMainMouseDown);
  mapPinMain.addEventListener('mouseup', dependencies.pin.onMapPinMainMouseUp);
  typeSelect.addEventListener('change', dependencies.form.onTypeSelectChanged);
  timeInSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
  timeOutSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
  window.addEventListener('resize', dependencies.pin.updateMapLimits);
  dependencies.backend.load(onSuccess, onError);
})();

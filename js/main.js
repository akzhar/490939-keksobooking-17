'use strict';

(function () {
  var dependencies = {
    form: window.form,
    mainPin: window.mainPin
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  mapPinMain.addEventListener('mousedown', dependencies.mainPin.onMapPinMainMouseDown);
  mapPinMain.addEventListener('mouseup', dependencies.mainPin.onMapPinMainMouseUp);
  typeSelect.addEventListener('change', dependencies.form.onTypeSelectChanged);
  timeInSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
  timeOutSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
  window.addEventListener('resize', dependencies.mainPin.updateMapLimits);
})();

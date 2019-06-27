'use strict';

var dependencies = {
  form: window.form,
  pin: window.pin
};
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var typeSelect = adForm.querySelector('#type');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

mapPinMain.addEventListener('mousedown', dependencies.pin.onMapPinMainMouseDown);
mapPinMain.addEventListener('mouseup', dependencies.pin.onMapPinMainMouseUp);
typeSelect.addEventListener('change', dependencies.form.onTypeSelectChanged);
timeInSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
timeOutSelect.addEventListener('change', dependencies.form.onTimeInOutSelectChange);
window.addEventListener('resize', dependencies.pin.updateMapLimits);

'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var conectedSelectChildren = [].slice.call(capacitySelect.children);

  function onTypeSelectChange() {
    var selectedOption = typeSelect.querySelectorAll('option')[typeSelect.selectedIndex];
    var type = selectedOption.value.toUpperCase();
    var minPrice = dependencies.data.MinPrice[type];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  }

  function onTimeInSelectChange(evt) {
    var conectedSelect = timeOutSelect;
    conectedSelect.value = evt.target.value;
  }

  function onTimeOutSelectChange(evt) {
    var conectedSelect = timeInSelect;
    conectedSelect.value = evt.target.value;
  }

  function onRoomsSelectChange() {
    var roomsValue = roomsSelect.value;
    var isException = (roomsValue === dependencies.data.ROOMS_VALUE_EXCEPTION);
    if (isException) {
      roomsValue = dependencies.data.CAPACITY_VALUE_EXCEPTION;
    }
    conectedSelectChildren.forEach(function (it) {
      it.removeAttribute(dependencies.data.DISABLED_ATTRIBUTE);
      var ExceptionCondition = (it.value !== dependencies.data.CAPACITY_VALUE_EXCEPTION);
      var StandardCondition = (it.value > roomsValue || it.value === dependencies.data.CAPACITY_VALUE_EXCEPTION);
      var condition = (isException) ? ExceptionCondition : StandardCondition;
      if (condition) {
        it.setAttribute(dependencies.data.DISABLED_ATTRIBUTE, true);
      }
    });
    capacitySelect.value = roomsValue;
  }

  window.validation = {
    onTypeSelectChange: onTypeSelectChange,
    onTimeInSelectChange: onTimeInSelectChange,
    onTimeOutSelectChange: onTimeOutSelectChange,
    onRoomsSelectChange: onRoomsSelectChange
  };
})();

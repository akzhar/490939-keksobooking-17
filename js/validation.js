'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var CAPACITY_VALUE_EXCEPTION = '0';
  var ROOMS_VALUE_EXCEPTION = '100';
  var DISABLED_ATTRIBUTE = 'disabled';
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

  function onTimeSelectChange(evt) {
    var targetSelect = evt.target;
    var conectedSelect = (targetSelect === timeInSelect) ? timeOutSelect : timeInSelect;
    conectedSelect.value = targetSelect.value;
  }

  function onRoomsSelectChange() {
    var roomsValue = roomsSelect.value;
    var isException = (roomsValue === ROOMS_VALUE_EXCEPTION);
    if (isException) {
      roomsValue = CAPACITY_VALUE_EXCEPTION;
    }
    conectedSelectChildren.forEach(function (it) {
      it.removeAttribute(DISABLED_ATTRIBUTE);
      var ExceptionCondition = (it.value !== CAPACITY_VALUE_EXCEPTION);
      var StandardCondition = (it.value > roomsValue || it.value === CAPACITY_VALUE_EXCEPTION);
      var condition = (isException) ? ExceptionCondition : StandardCondition;
      if (condition) {
        it.setAttribute(DISABLED_ATTRIBUTE, true);
      }
    });
    capacitySelect.value = roomsValue;
  }

  window.validation = {
    onTypeSelectChange: onTypeSelectChange,
    onTimeSelectChange: onTimeSelectChange,
    onRoomsSelectChange: onRoomsSelectChange
  };
})();

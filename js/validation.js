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

  function onTypeSelectChange() {
    var selectedOptionIndex = typeSelect.selectedIndex;
    var selectedOption = typeSelect.querySelectorAll('option')[selectedOptionIndex];
    var minPrice = dependencies.data.MIN_PRICES[selectedOption.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  }

  function onTimeSelectChange(evt) {
    var targetSelect = evt.target;
    var conectedSelect = (targetSelect === timeInSelect) ? timeOutSelect : timeInSelect;
    var selectedValue = targetSelect.value;
    conectedSelect.value = selectedValue;
  }

  function onRoomSelectChange() {
    var CAPACITY_SELECT_EXCEPTION = '0';
    var ROOMS_SELECT_EXCEPTION = '100';
    var DISABLED_CLASS = 'disabled';
    var selectedValue = roomsSelect.value;
    var conectedSelectChildren = [].slice.call(capacitySelect.children);

    function disableOption(it) {
      if (it.value > selectedValue || it.value === CAPACITY_SELECT_EXCEPTION) {
        it.setAttribute(DISABLED_CLASS, true);
      }
    }

    function disableconectedSelectOptions() {
      conectedSelectChildren.forEach(function (it) {
        it.removeAttribute(DISABLED_CLASS);
        disableOption(it);
      });
      capacitySelect.value = selectedValue;
    }

    function disableconectedSelectOptionsExceptVal() {
      var exceptionVal = CAPACITY_SELECT_EXCEPTION;
      conectedSelectChildren.forEach(function (it) {
        it.removeAttribute(DISABLED_CLASS);
        if (it.value !== exceptionVal) {
          it.setAttribute(DISABLED_CLASS, true);
        }
      });
      capacitySelect.value = exceptionVal;
    }

    if (selectedValue === ROOMS_SELECT_EXCEPTION) {
      disableconectedSelectOptionsExceptVal();
    } else {
      disableconectedSelectOptions();
    }
  }

  window.validation = {
    onTypeSelectChange: onTypeSelectChange,
    onTimeSelectChange: onTimeSelectChange,
    onRoomSelectChange: onRoomSelectChange
  };
})();

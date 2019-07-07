'use strict';

(function () {
  var dependencies = {
    data: window.data,
    utils: window.utils
  };
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');

  function unlockForm() {
    var inputs = document.querySelectorAll('input');
    var selects = document.querySelectorAll('select');
    var textarea = document.querySelector('textarea');
    var sumbitBtn = document.querySelector('.ad-form__submit');
    dependencies.utils.removeAttributes(inputs, 'disabled');
    dependencies.utils.removeAttributes(selects, 'disabled');
    textarea.removeAttribute('disabled');
    sumbitBtn.removeAttribute('disabled');
    adForm.classList.remove('ad-form--disabled');
  }

  function onTypeSelectChange() {
    var selectedOptionIndex = typeSelect.selectedIndex;
    var selectedOption = typeSelect.querySelectorAll('option')[selectedOptionIndex];
    var minPrice = dependencies.data.MIN_PRICES[selectedOption.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  }

  function onTimeSelectChange(evt) {
    var targetSelect = evt.target;
    var linkedSelect = (targetSelect === timeInSelect) ? timeOutSelect : timeInSelect;
    var selectedValue = targetSelect.value;
    linkedSelect.value = selectedValue;
  }

  function onRoomSelectChange() {
    var ZERO_GUESTS = '0';
    var HUNDRED__ROOMS = '100';
    var CLASS_DISABLED = 'disabled';
    var selectedValue = roomsSelect.value;
    var linkedSelectChildren = [].slice.call(capacitySelect.children);

    function disableOption(it) {
      if (it.value > selectedValue || it.value === ZERO_GUESTS) {
        it.setAttribute(CLASS_DISABLED, true);
      }
    }

    function disableLinkedSelectOptions() {
      linkedSelectChildren.forEach(function (it) {
        it.removeAttribute(CLASS_DISABLED);
        disableOption(it);
      });
      capacitySelect.value = selectedValue;
    }

    function disableLinkedSelectOptionsExceptVal() {
      var exceptionVal = ZERO_GUESTS;
      linkedSelectChildren.forEach(function (it) {
        it.removeAttribute(CLASS_DISABLED);
        if (it.value !== exceptionVal) {
          it.setAttribute(CLASS_DISABLED, true);
        }
      });
      capacitySelect.value = exceptionVal;
    }

    if (selectedValue === HUNDRED__ROOMS) {
      disableLinkedSelectOptionsExceptVal();
    } else {
      disableLinkedSelectOptions();
    }
  }

  window.form = {
    unlockForm: unlockForm,
    onTypeSelectChange: onTypeSelectChange,
    onTimeSelectChange: onTimeSelectChange,
    onRoomSelectChange: onRoomSelectChange
  };
})();

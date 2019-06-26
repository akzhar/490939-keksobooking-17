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
  window.form = {
    unlockForm: function () {
      var inputs = document.querySelectorAll('input');
      var selects = document.querySelectorAll('select');
      var textarea = document.querySelector('textarea');
      var sumbitBtn = document.querySelector('.ad-form__submit');
      dependencies.utils.removeAttributes(inputs, 'disabled');
      dependencies.utils.removeAttributes(selects, 'disabled');
      textarea.removeAttribute('disabled');
      sumbitBtn.removeAttribute('disabled');
      adForm.classList.remove('ad-form--disabled');
    },
    onTypeSelectChanged: function () {
      var selectedOptionIndex = typeSelect.selectedIndex;
      var selectedOption = typeSelect.querySelectorAll('option')[selectedOptionIndex];
      var minPrice = dependencies.data.MIN_PRICES[selectedOption.value];
      priceInput.min = minPrice;
      priceInput.placeholder = minPrice;
    },
    onTimeInOutSelectChange: function (evt) {
      var connectedSelect = (evt.target === timeInSelect) ? timeOutSelect : timeInSelect;
      var selectedOptionIndex = evt.target.selectedIndex;
      connectedSelect.selectedIndex = selectedOptionIndex;
    }
  };
})();

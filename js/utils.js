'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function getRandomKeyInObject(arr) {
    var keys = Object.keys(arr);
    var key = keys[window.utils.getRandomNumber(0, keys.length - 1)];
    return key;
  }

  function removeAttributes(arr, attribute) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute(attribute);
    }
  }

  function addAttributes(arr, attribute, val) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute(attribute, val);
    }
  }

  function debounce(cb) {
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomKeyInObject: getRandomKeyInObject,
    removeAttributes: removeAttributes,
    addAttributes: addAttributes,
    debounce: debounce
  };
})();

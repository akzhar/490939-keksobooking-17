'use strict';

(function () {
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomKeyInObject: getRandomKeyInObject,
    removeAttributes: removeAttributes
  };
})();

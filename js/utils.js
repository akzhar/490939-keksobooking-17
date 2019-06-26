'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    getRandomKeyInObject: function (arr) {
      var keys = Object.keys(arr);
      var key = keys[window.utils.getRandomNumber(0, keys.length - 1)];
      return key;
    },
    removeAttributes: function (objectsArr, attributeStr) {
      for (var i = 0; i < objectsArr.length; i++) {
        objectsArr[i].removeAttribute(attributeStr);
      }
    }
  };
})();

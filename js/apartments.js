'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  window.apartments = {
    generateApartments: generateApartments
  };

  function generateApartments(fragment) {
    var mapPins = mapBlock.querySelector('.map__pins');
    mapPins.appendChild(fragment);
  }
})();

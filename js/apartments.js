'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  function generateApartments(fragment) {
    var mapPins = mapBlock.querySelector('.map__pins');
    mapPins.appendChild(fragment);
  }

  window.apartments = {
    generateApartments: generateApartments
  };
})();

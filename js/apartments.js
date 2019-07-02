'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  function generateApartments(offers) {
    var mapPins = mapBlock.querySelector('.map__pins');
    mapPins.appendChild(offers);
  }

  window.apartments = {
    generateApartments: generateApartments
  };
})();

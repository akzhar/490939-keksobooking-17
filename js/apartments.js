'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');

  function renderApartments(offers) {
    mapPins.appendChild(offers);
  }

  window.apartments = {
    renderApartments: renderApartments
  };
})();

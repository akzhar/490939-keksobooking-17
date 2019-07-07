'use strict';

(function () {
  var dependencies = {
    data: window.data,
    pin: window.pin,
    map: window.map
  };

  var mapBlock = document.querySelector('.map');
  var typeFilter = mapBlock.querySelector('#housing-type');
  var mapPins = mapBlock.querySelector('.map__pins');

  typeFilter.addEventListener('change', onTypeFilterChange);

  function onTypeFilterChange() {
    var typeFilteredOffers = dependencies.data.OFFERS;
    if (typeFilter.value !== 'any') {
      typeFilteredOffers = dependencies.data.OFFERS.filter(function (apartment) {
        if (apartment.offer.type === typeFilter.value) {
          return apartment;
        }
        return null;
      });
    }
    dependencies.map.cleanMap();
    var renderedPins = dependencies.pin.renderPins(typeFilteredOffers);
    mapPins.appendChild(renderedPins);
  }
})();

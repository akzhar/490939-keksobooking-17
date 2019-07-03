'use strict';

(function () {
  var dependencies = {
    data: window.data,
    apartments: window.apartments,
    pin: window.pin,
    map: window.map
  };
  var mapBlock = document.querySelector('.map');
  var typeFilter = mapBlock.querySelector('#housing-type');

  typeFilter.addEventListener('change', onTypeFilterChange);

  function onTypeFilterChange() {
    var typeFilteredOffers = dependencies.data.offers;
    if (typeFilter.value !== 'any') {
      typeFilteredOffers = dependencies.data.offers.filter(function (apartment) {
        if (apartment.offer.type === typeFilter.value) {
          return apartment;
        }
        return null;
      });
    }
    dependencies.map.cleanMap();
    dependencies.data.renderedPins = dependencies.pin.renderPins(typeFilteredOffers);
    dependencies.apartments.generateApartments(dependencies.data.renderedPins);
  }

})();

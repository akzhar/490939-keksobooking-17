'use strict';

(function () {
  var dependencies = {
    apartments: window.apartments,
    fragment: window.fragment
  };
  var mapBlock = document.querySelector('.map');
  var typeFilter = mapBlock.querySelector('#housing-type');

  typeFilter.addEventListener('change', onTypeFilterChange);

  function cleanMap() {
    var mapPins = mapBlock.querySelector('.map__pins');
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  }

  function onTypeFilterChange() {
    var typeFilteredOffers = window.xhrData;
    if (typeFilter.value !== 'any') {
      typeFilteredOffers = window.xhrData.filter(function (apartment) {
        if (apartment.offer.type === typeFilter.value) {
          return apartment;
        }
        return null;
      });
    }
    cleanMap();
    window.renderedPins = dependencies.fragment.getRenderedPins(typeFilteredOffers);
    dependencies.apartments.generateApartments(window.renderedPins);
  }

})();

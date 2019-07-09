'use strict';

(function () {
  var dependencies = {
    data: window.data,
    pin: window.pin,
    map: window.map
  };

  var ANY_TYPE_VALUE = 'any';
  var mapBlock = document.querySelector('.map');
  var typeFilter = mapBlock.querySelector('#housing-type');
  var mapPins = mapBlock.querySelector('.map__pins');

  function onTypeSelectChange() {
    var typeFilteredOffers = dependencies.data.OFFERS;
    if (typeFilter.value !== ANY_TYPE_VALUE) {
      typeFilteredOffers = dependencies.data.OFFERS.filter(function (it) {
        if (it.offer.type === typeFilter.value) {
          return it;
        }
        return null;
      });
    }
    dependencies.map.clean();
    var renderedPins = dependencies.pin.render(typeFilteredOffers);
    mapPins.appendChild(renderedPins);
  }

  function switchOn() {
    typeFilter.addEventListener('change', onTypeSelectChange);
  }

  function switchOff() {
    typeFilter.removeEventListener('change', onTypeSelectChange);
  }

  window.filter = {
    switchOn: switchOn,
    switchOff: switchOff
  };
})();

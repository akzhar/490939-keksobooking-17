'use strict';

(function () {
  var dependencies = {
    utils: window.utils,
    data: window.data,
    pin: window.pin,
    map: window.map
  };

  var Price = {
    LOW: {
      FROM: 0,
      TO: 10000
    },
    MIDDLE: {
      FROM: 10000,
      TO: 50000
    },
    HIGH: {
      FROM: 50000,
      TO: Infinity
    }
  };
  var ANY_VALUE = 'any';
  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var dataToBeFiltered = [];
  var Filter = {
    'TYPE': checkType,
    'PRICE': checkPrice,
    'ROOMS': checkRooms,
    'GUESTS': checkGuests,
    'WIFI': checkFeature,
    'DISHWASHER': checkFeature,
    'PARKING': checkFeature,
    'WASHER': checkFeature,
    'ELEVATOR': checkFeature,
    'CONDITIONER': checkFeature
  };
  var IdToKey = {
    'housing-type': 'TYPE',
    'housing-price': 'PRICE',
    'housing-rooms': 'ROOMS',
    'housing-guests': 'GUESTS',
    'filter-wifi': 'WIFI',
    'filter-dishwasher': 'DISHWASHER',
    'filter-parking': 'PARKING',
    'filter-washer': 'WASHER',
    'filter-elevator': 'ELEVATOR',
    'filter-conditioner': 'CONDITIONER'
  };
  var filterState = {};

  function filterData(callback, filterValue) {
    var filteredData = dataToBeFiltered;
    if (filterValue !== ANY_VALUE) {
      filteredData = dataToBeFiltered.filter(function (it) {
        return callback(it, filterValue);
      });
    }
    dataToBeFiltered = filteredData;
  }

  function checkIt(condition, it) {
    if (condition) {
      return it;
    }
    return null;
  }

  function checkPrice(it, filterValue) {
    var lowerLimit = Price[filterValue.toUpperCase()].FROM;
    var upperLimit = Price[filterValue.toUpperCase()].TO;
    var condition = ((it.offer.price >= lowerLimit) && (it.offer.price <= upperLimit));
    return checkIt(condition, it);
  }

  function checkType(it, filterValue) {
    var condition = (it.offer.type === filterValue);
    return checkIt(condition, it);
  }

  function checkRooms(it, filterValue) {
    var condition = (it.offer.rooms === +filterValue);
    return checkIt(condition, it);
  }

  function checkGuests(it, filterValue) {
    var condition = (it.offer.guests === +filterValue);
    return checkIt(condition, it);
  }

  function checkFeature(it, filterValue) {
    var condition = it.offer.features.some(function (feature) {
      return feature === filterValue;
    });
    return checkIt(condition, it);
  }

  function renderFilteredOffers() {
    dependencies.map.clean();
    var renderedPins = dependencies.pin.render(dataToBeFiltered);
    mapPins.appendChild(renderedPins);
  }

  function onFiltersChange(evt) {
    dataToBeFiltered = dependencies.data.OFFERS;
    var filter = evt.target;
    var id = filter.id;
    var key = IdToKey[id];
    filterState[key] = filter.value;
    if (filter.checked === false) {
      filterState[key] = ANY_VALUE;
    }
    for (var filterKey in filterState) {
      if (filterState.propertyIsEnumerable(filterKey)) {
        var callback = Filter[filterKey];
        var filterValue = filterState[filterKey];
        filterData(callback, filterValue);
      }
    }
    dependencies.utils.debounce(renderFilteredOffers)();
  }

  function switchOn() {
    mapFilters.addEventListener('change', onFiltersChange);
  }

  function switchOff() {
    mapFilters.removeEventListener('change', onFiltersChange);
  }

  window.filter = {
    switchOn: switchOn,
    switchOff: switchOff
  };
})();

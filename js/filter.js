'use strict';

(function () {
  var dependencies = {
    utils: window.utils,
    data: window.data,
    pin: window.pin,
    map: window.map
  };

  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var FilterFunction = {
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
  var filterState = {};
  var dataToBeFiltered = [];

  function filterData(callback, filterValue) {
    var filteredData = dataToBeFiltered;
    if (filterValue !== dependencies.data.FILTER_ANY_VALUE) {
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
    var lowerLimit = dependencies.data.PriceLimit[filterValue.toUpperCase()].FROM;
    var upperLimit = dependencies.data.PriceLimit[filterValue.toUpperCase()].TO;
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
    var key = dependencies.data.IdToKey[id];
    filterState[key] = filter.value;
    if (filter.checked === false) {
      filterState[key] = dependencies.data.FILTER_ANY_VALUE;
    }
    for (var filterKey in filterState) {
      if (filterState.hasOwnProperty(filterKey)) {
        var callback = FilterFunction[filterKey];
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

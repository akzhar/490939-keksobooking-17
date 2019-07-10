'use strict';

(function () {
  var dependencies = {
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
  var typeFilter = mapFilters.querySelector('#housing-type');
  var priceFilter = mapFilters.querySelector('#housing-price');
  var roomsFilter = mapFilters.querySelector('#housing-rooms');
  var guestsFilter = mapFilters.querySelector('#housing-guests');
  var featuresFilters = mapFilters.querySelector('#housing-features');
  var offers = [];
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
  }
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
  var Checks = ['TYPE', 'PRICE', 'ROOMS', 'GUESTS', 'WIFI', 'DISHWASHER', 'PARKING', 'WASHER', 'ELEVATOR', 'CONDITIONER'];
  var ChecksQueue = [];
  var FilterState = {};

  function renderFilteredOffers(offers) {
    dependencies.map.clean();
    var renderedPins = dependencies.pin.render(offers);
    mapPins.appendChild(renderedPins);
  }

  function filterOffers(callback, filterValue) {
    var filteredOffers = offers;
    if (filterValue !== ANY_VALUE) {
      filteredOffers = offers.filter(function (it) {
        return callback(it, filterValue);
      });
    }
    // debugger;
    offers = filteredOffers;
    renderFilteredOffers(offers);
  }

  function checkIt(condition, it) {
    if (condition) {
      return it;
    }
    return null;
  }

  function checkType(it, filterValue) {
    var condition = (it.offer.type === filterValue);
    return checkIt(condition, it);
  }

  function checkPrice(it, filterValue) {
    var lowerLimit = Price[filterValue.toUpperCase()].FROM;
    var upperLimit = Price[filterValue.toUpperCase()].TO;
    var condition = ((it.offer.price >= lowerLimit) && (it.offer.price <= upperLimit));
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

  function defineChecksQueue() {
    Checks.forEach(function (check) {
      if (FilterState.hasOwnProperty(check)) {
        var checkObj = [];
        checkObj[0] = check;
        checkObj[1] = FilterState[check];
        ChecksQueue.push(checkObj);
      }
    })
    // debugger;
  }

  function onFiltersChange(evt) {
    offers = dependencies.data.OFFERS;
    var id = evt.target.id;
    var filter = mapFilters.querySelector('#' + id);
    var key = IdToKey[id];
    // debugger;
    FilterState[key] = filter.value;
    defineChecksQueue();

    // фильтровать только изменившееся значение (условие)
    for(var i = 0; i < ChecksQueue.length; i++) {
      var filterKey = ChecksQueue[i][0];
      var filterValue = ChecksQueue[i][1];
      // debugger;
      var callback = Filter[filterKey];
      filterOffers(callback, filterValue);
    }
    ChecksQueue.length = 0;
    offers = dependencies.data.OFFERS;
  }

  function switchOn() {
    mapFilters.addEventListener('change', onFiltersChange);
  }

  function switchOff() {
    mapFilters.removeEventListener('change', onFiltersChange);
  }

  window.filter = {
    switchOn: switchOn,
    switchOff: switchOff,
    FilterState: FilterState, // temp
    ChecksQueue: ChecksQueue // temp
  };
})();

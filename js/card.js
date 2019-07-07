'use strict';

(function () {

  function renderCards(apartments) {
    var fragment = document.createDocumentFragment();
    // apartments.forEach(function (it) {
    // var card = createCard(it);
    // fragment.appendChild(card);
    // });
    var card = createCard(apartments[0]);
    fragment.appendChild(card);
    return fragment;
  }

  function createCard(apartment) {
    var templateCard = document.getElementById('card').content.querySelector('.map__card');
    var card = templateCard.cloneNode(true);
    var avatar = card.querySelector('.popup__avatar');
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var roomsAndGuests = card.querySelector('.popup__text--capacity');
    var checkInAndOut = card.querySelector('.popup__text--time');
    var features = card.querySelector('.popup__features');
    var description = card.querySelector('.popup__description');
    var photos = card.querySelector('.popup__photos');

    avatar.src = apartment.author.avatar;
    title.textContent = apartment.offer.title;
    address.textContent = apartment.offer.address;
    price.textContent = apartment.offer.price + ' ₽/ночь';
    switch (apartment.offer.type) {
      case 'flat':
        type.textContent = 'Квартира';
        break;
      case 'bungalo':
        type.textContent = 'Бунгало';
        break;
      case 'house':
        type.textContent = 'Дом';
        break;
      case 'palace':
        type.textContent = 'Дворец';
        break;
    }
    roomsAndGuests.textContent = apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей';
    checkInAndOut.textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;

    var featuresChildren = [].slice.call(features.children);
    featuresChildren.forEach(function (it) {
      features.removeChild(it);
    });

    apartment.offer.features.forEach(function (it) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + it);
      features.appendChild(feature);
    });

    description.textContent = apartment.offer.description;

    var photosChildren = [].slice.call(photos.children);
    photosChildren.forEach(function (it) {
      photos.removeChild(it);
    });

    apartment.offer.photos.forEach(function (it) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.src = it;
      photos.appendChild(photo);
    });
    return card;
  }

  window.card = {
    renderCards: renderCards
  };
})();

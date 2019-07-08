'use strict';

(function () {
  var dependencies = {
    data: window.data,
    map: window.map
  };

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');

  function renderCard(apartment) {
    var fragment = document.createDocumentFragment();
    var card = createCard(apartment);
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
    var closeBtn = card.querySelector('.popup__close');
    var featuresChildren = [].slice.call(features.children);
    var photosChildren = [].slice.call(photos.children);

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
    featuresChildren.forEach(function (it) {
      features.removeChild(it);
    });
    apartment.offer.features.forEach(function (it) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + it);
      features.appendChild(feature);
    });
    description.textContent = apartment.offer.description;
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
    closeBtn.addEventListener('click', onCloseBtnClick);
    window.addEventListener('keydown', onEscKeyDown);
    return card;
  }

  function onCloseBtnClick() {
    window.removeEventListener('keydown', onEscKeyDown);
    closePopup();
  }

  function onEscKeyDown(evt) {
    if (evt.keyCode === dependencies.data.ESC_KEYCODE) {
      window.removeEventListener('keydown', onEscKeyDown);
      closePopup();
    }
  }

  function closePopup() {
    var popup = mapPins.querySelector('.popup');
    mapPins.removeChild(popup);
  }

  function openPopup(title) {
    dependencies.map.cleanCards();
    var apartment = dependencies.data.OFFERS.filter(function (it) {
      if (it.offer.title === title) {
        return it;
      }
      return null;
    })[0];
    var renderedCard = renderCard(apartment);
    mapPins.appendChild(renderedCard);
  }

  window.card = {
    renderCard: renderCard,
    openPopup: openPopup
  };
})();

'use strict';

(function () {
  var dependencies = {
    data: window.data,
    map: window.map
  };

  var ESC_KEYCODE = 27;
  var FEATURE_CLASS = 'popup__feature';
  var PHOTO_CLASS = 'popup__photo';
  var PRICE_UNIT = ' ₽/ночь';
  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  function render(data, i) {
    var fragment = document.createDocumentFragment();
    var card = create(data, i);
    fragment.appendChild(card);
    return fragment;
  }

  function create(data, i) {
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
    var typeEng = data.offer.type.toUpperCase();

    avatar.src = data.author.avatar;
    title.textContent = data.offer.title;
    address.textContent = data.offer.address;
    price.textContent = data.offer.price + PRICE_UNIT;
    type.textContent = dependencies.data.Translation[typeEng];
    roomsAndGuests.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    checkInAndOut.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    featuresChildren.forEach(function (it) {
      features.removeChild(it);
    });
    data.offer.features.forEach(function (it) {
      var feature = document.createElement('li');
      feature.classList.add(FEATURE_CLASS, FEATURE_CLASS + '--' + it);
      features.appendChild(feature);
    });
    description.textContent = data.offer.description;
    photosChildren.forEach(function (it) {
      photos.removeChild(it);
    });
    data.offer.photos.forEach(function (it) {
      var photo = document.createElement('img');
      photo.classList.add(PHOTO_CLASS);
      photo.width = dependencies.data.PhotoSize.WIDTH;
      photo.height = dependencies.data.PhotoSize.HEIGHT;
      photo.src = it;
      photos.appendChild(photo);
    });
    card.setAttribute('data-id', i);
    closeBtn.addEventListener('click', onCloseBtnClick);
    window.addEventListener('keydown', onEscKeyDown);
    return card;
  }

  function onCloseBtnClick() {
    window.removeEventListener('keydown', onEscKeyDown);
    close();
  }

  function onEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removeEventListener('keydown', onEscKeyDown);
      close();
    }
  }

  function close() {
    var popup = mapPins.querySelector('.popup');
    dependencies.map.removePinActiveClass();
    mapPins.removeChild(popup);
  }

  function isOpened(i) {
    var card = mapPins.querySelector('.map__card');
    if (card === null) {
      return false;
    }
    var dataId = card.getAttribute('data-id');
    if (+dataId === i) {
      return true;
    }
    return false;
  }

  function open(i) {
    if (isOpened(i)) {
      return;
    }
    var data = dependencies.data.renderedOffers[i];
    var popup = render(data, i);
    dependencies.map.removeCard();
    mapPins.appendChild(popup);
  }

  window.card = {
    open: open
  };
})();

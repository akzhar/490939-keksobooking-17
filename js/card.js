'use strict';

(function () {
  var dependencies = {
    utils: window.utils,
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

  function renderCard(apartment, i) {
    var fragment = document.createDocumentFragment();
    var card = createCard(apartment, i);
    fragment.appendChild(card);
    return fragment;
  }

  function renderBlockIfDataExists(parentBlock, data, block) {
    if (data !== undefined) {
      block.textContent = data;
    } else {
      parentBlock.removeChild(block);
    }
  }

  function returnDataIfExists(data) {
    if (data !== undefined) {
      return data;
    }
    return undefined;
  }

  function createPhoto(it, parentBlock) {
    var photo = document.createElement('img');
    photo.classList.add(PHOTO_CLASS);
    photo.width = dependencies.data.PhotoSize.WIDTH;
    photo.height = dependencies.data.PhotoSize.HEIGHT;
    photo.src = it;
    parentBlock.appendChild(photo);
  }

  function createFeature(it, parentBlock) {
    var feature = document.createElement('li');
    feature.classList.add(FEATURE_CLASS, FEATURE_CLASS + '--' + it);
    parentBlock.appendChild(feature);
  }

  function createCard(apartment, i) {
    var card = templateCard.cloneNode(true);
    var avatarBlock = card.querySelector('.popup__avatar');
    var titleBlock = card.querySelector('.popup__title');
    var addressBlock = card.querySelector('.popup__text--address');
    var priceBlock = card.querySelector('.popup__text--price');
    var typeBlock = card.querySelector('.popup__type');
    var roomsAndGuestsBlock = card.querySelector('.popup__text--capacity');
    var checkInAndOutBlock = card.querySelector('.popup__text--time');
    var featuresBlock = card.querySelector('.popup__features');
    var descriptionBlock = card.querySelector('.popup__description');
    var photosBlock = card.querySelector('.popup__photos');
    var closeBtn = card.querySelector('.popup__close');
    var Data = {
      avatar: returnDataIfExists(apartment.author.avatar),
      title: returnDataIfExists(apartment.offer.title),
      address: returnDataIfExists(apartment.offer.address),
      price: returnDataIfExists(apartment.offer.price),
      type: returnDataIfExists(apartment.offer.type),
      rooms: returnDataIfExists(apartment.offer.rooms),
      guests: returnDataIfExists(apartment.offer.guests),
      checkIn: returnDataIfExists(apartment.offer.checkin),
      checkOut: returnDataIfExists(apartment.offer.checkout),
      features: apartment.offer.features,
      description: returnDataIfExists(apartment.offer.description),
      photos: apartment.offer.photos,
      roomsAndGuests: undefined,
      checkInAndOut: undefined
    };

    dependencies.utils.cleanBlocksChildren(featuresBlock);
    dependencies.utils.cleanBlocksChildren(photosBlock);
    if (Data.price !== undefined) {
      Data.price = Data.price + PRICE_UNIT;
    }
    if (Data.type !== undefined) {
      Data.type = dependencies.data.Translation[Data.type.toUpperCase()];
    }
    if (Data.rooms !== undefined && Data.guests !== undefined) {
      var roomsWord = dependencies.utils.defineRoomWord(Data.rooms);
      var guestWord = dependencies.utils.defineGuestWord(Data.guests);
      Data.roomsAndGuests = Data.rooms + ' ' + roomsWord + ' для ' + Data.guests + ' ' + guestWord;
    }
    if (Data.checkIn !== undefined && Data.checkOut !== undefined) {
      Data.heckInOut = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
    }
    if (Data.avatar !== undefined) {
      avatarBlock.src = Data.avatar;
    } else {
      card.removeChild(avatarBlock);
    }
    renderBlockIfDataExists(card, Data.title, titleBlock);
    renderBlockIfDataExists(card, Data.address, addressBlock);
    renderBlockIfDataExists(card, Data.price, priceBlock);
    renderBlockIfDataExists(card, Data.type, typeBlock);
    renderBlockIfDataExists(card, Data.roomsAndGuests, roomsAndGuestsBlock);
    renderBlockIfDataExists(card, Data.checkInAndOut, checkInAndOutBlock);
    renderBlockIfDataExists(card, Data.description, descriptionBlock);
    if (Data.features.length !== 0) {
      Data.features.forEach(function (it) {
        createFeature(it, featuresBlock);
      });
    } else {
      card.removeChild(featuresBlock);
    }
    if (Data.photos.length !== 0) {
      Data.photos.forEach(function (it) {
        createPhoto(it, photosBlock);
      });
    } else {
      card.removeChild(photosBlock);
    }
    card.setAttribute('data-id', i);
    closeBtn.addEventListener('click', onCloseBtnClick);
    window.addEventListener('keydown', onEscKeyDown);
    return card;
  }

  function onCloseBtnClick() {
    window.removeEventListener('keydown', onEscKeyDown);
    closeCard();
  }

  function onEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.removeEventListener('keydown', onEscKeyDown);
      closeCard();
    }
  }

  function closeCard() {
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
    var apartment = dependencies.data.renderedOffers[i];
    var popup = renderCard(apartment, i);
    dependencies.map.removeCard();
    mapPins.appendChild(popup);
  }

  window.card = {
    open: open
  };
})();

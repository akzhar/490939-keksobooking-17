'use strict';

(function () {
  var dependencies = {
    utils: window.utils,
    data: window.data,
    map: window.map
  };

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
    photo.classList.add(dependencies.data.PHOTO_CLASS);
    photo.width = dependencies.data.PhotoSize.WIDTH;
    photo.height = dependencies.data.PhotoSize.HEIGHT;
    photo.src = it;
    parentBlock.appendChild(photo);
  }

  function createFeature(it, parentBlock) {
    var feature = document.createElement('li');
    feature.classList.add(dependencies.data.FEATURE_CLASS, dependencies.data.FEATURE_CLASS + '--' + it);
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
      AVATAR: returnDataIfExists(apartment.author.avatar),
      TITLE: returnDataIfExists(apartment.offer.title),
      ADDRESS: returnDataIfExists(apartment.offer.address),
      PRICE: returnDataIfExists(apartment.offer.price),
      TYPE: returnDataIfExists(apartment.offer.type),
      ROOMS: returnDataIfExists(apartment.offer.rooms),
      GUESTS: returnDataIfExists(apartment.offer.guests),
      CHECK_IN: returnDataIfExists(apartment.offer.checkin),
      CHECK_OUT: returnDataIfExists(apartment.offer.checkout),
      FEATURES: apartment.offer.features,
      DESCRIPTION: returnDataIfExists(apartment.offer.description),
      PHOTOS: apartment.offer.photos,
      ROOMS_AND_GUESTS: undefined,
      CHECK_IN_AND_OUT: undefined
    };

    dependencies.utils.cleanBlocksChildren(featuresBlock);
    dependencies.utils.cleanBlocksChildren(photosBlock);
    if (Data.PRICE !== undefined) {
      Data.PRICE = Data.PRICE + dependencies.data.PRICE_UNIT;
    }
    if (Data.TYPE !== undefined) {
      Data.TYPE = dependencies.data.Translation[Data.TYPE.toUpperCase()];
    }
    if (Data.ROOMS !== undefined && Data.GUESTS !== undefined) {
      var roomsWord = dependencies.utils.defineRoomWord(Data.ROOMS);
      var guestWord = dependencies.utils.defineGuestWord(Data.GUESTS);
      Data.ROOMS_AND_GUESTS = Data.ROOMS + ' ' + roomsWord + ' для ' + Data.GUESTS + ' ' + guestWord;
    }
    if (Data.CHECK_IN !== undefined && Data.CHECK_OUT !== undefined) {
      Data.CHECK_IN_AND_OUT = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
    }
    if (Data.AVATAR !== undefined) {
      avatarBlock.src = Data.AVATAR;
    } else {
      card.removeChild(avatarBlock);
    }
    renderBlockIfDataExists(card, Data.TITLE, titleBlock);
    renderBlockIfDataExists(card, Data.ADDRESS, addressBlock);
    renderBlockIfDataExists(card, Data.PRICE, priceBlock);
    renderBlockIfDataExists(card, Data.TYPE, typeBlock);
    renderBlockIfDataExists(card, Data.ROOMS_AND_GUESTS, roomsAndGuestsBlock);
    renderBlockIfDataExists(card, Data.CHECK_IN_AND_OUT, checkInAndOutBlock);
    renderBlockIfDataExists(card, Data.DESCRIPTION, descriptionBlock);
    if (Data.FEATURES.length !== 0) {
      Data.FEATURES.forEach(function (it) {
        createFeature(it, featuresBlock);
      });
    } else {
      card.removeChild(featuresBlock);
    }
    if (Data.PHOTOS.length !== 0) {
      Data.PHOTOS.forEach(function (it) {
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
    if (evt.keyCode === dependencies.data.ESC_KEYCODE) {
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

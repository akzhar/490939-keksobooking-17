'use strict';

(function () {
  var dependencies = {
    utils: window.utils,
    data: window.data,
    map: window.map
  };

  var FunctionGet = {
    'FEATURES': getFeature,
    'PHOTOS': getPhoto
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

  function getPhoto(data) {
    var photo = document.createElement('img');
    photo.classList.add(dependencies.data.PHOTO_CLASS);
    photo.width = dependencies.data.PhotoSize.WIDTH;
    photo.height = dependencies.data.PhotoSize.HEIGHT;
    photo.src = data;
    return photo;
  }

  function getFeature(data) {
    var feature = document.createElement('li');
    feature.classList.add(dependencies.data.FEATURE_CLASS, dependencies.data.FEATURE_CLASS + '--' + data);
    return feature;
  }

  function defineDataToBeFilled(Data) {
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
      Data.CHECK_IN_AND_OUT = 'Заезд после ' + Data.CHECK_IN + ', выезд до ' + Data.CHECK_OUT;
    }
  }

  function getListOfBlockElements(callback, dataObject) {
    var fragment = document.createDocumentFragment();
    for (var key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        var element = callback(dataObject[key]);
        fragment.appendChild(element);
      }
    }
    return fragment;
  }

  function renderBlockIfDataExists(block, card) {
    var dataIsObject = (typeof block.data === 'object');
    var dataExists = (block.data !== undefined && block.data.length !== 0);

    if (dataExists && dataIsObject) {
      var list = getListOfBlockElements(FunctionGet[block.key], block.data);
      block.node.appendChild(list);
    }
    if (dataExists && !dataIsObject) {
      var nodeIsImg = (block.node.tagName === 'IMG');
      block.node.src = (nodeIsImg) ? block.data : null;
      block.node.textContent = (!nodeIsImg) ? block.data : null;
    }
    if (!dataExists) {
      card.removeChild(block.node);
    }
  }

  function renderBlocksIfDataExists(Block, Data, card) {
    for (var key in Block) {
      if (Block.hasOwnProperty(key)) {
        var block = {
          key: key,
          node: Block[key],
          data: Data[key]
        };
        renderBlockIfDataExists(block, card);
      }
    }
  }

  function createCard(apartment, i) {
    var card = templateCard.cloneNode(true);
    var closeBtn = card.querySelector('.popup__close');
    var Block = {
      AVATAR: card.querySelector('.popup__avatar'),
      TITLE: card.querySelector('.popup__title'),
      ADDRESS: card.querySelector('.popup__text--address'),
      PRICE: card.querySelector('.popup__text--price'),
      TYPE: card.querySelector('.popup__type'),
      FEATURES: card.querySelector('.popup__features'),
      DESCRIPTION: card.querySelector('.popup__description'),
      PHOTOS: card.querySelector('.popup__photos'),
      ROOMS_AND_GUESTS: card.querySelector('.popup__text--capacity'),
      CHECK_IN_AND_OUT: card.querySelector('.popup__text--time')
    };
    var Data = {
      AVATAR: apartment.author.avatar,
      TITLE: apartment.offer.title,
      ADDRESS: apartment.offer.address,
      PRICE: apartment.offer.price,
      TYPE: apartment.offer.type,
      FEATURES: apartment.offer.features,
      DESCRIPTION: apartment.offer.description,
      PHOTOS: apartment.offer.photos,
      ROOMS: apartment.offer.rooms,
      GUESTS: apartment.offer.guests,
      CHECK_IN: apartment.offer.checkin,
      CHECK_OUT: apartment.offer.checkout,
      ROOMS_AND_GUESTS: undefined,
      CHECK_IN_AND_OUT: undefined
    };

    dependencies.utils.cleanBlocksChildren(Block.FEATURES);
    dependencies.utils.cleanBlocksChildren(Block.PHOTOS);
    defineDataToBeFilled(Data);
    renderBlocksIfDataExists(Block, Data, card);
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

  function isAlreadyOpened(i) {
    var card = mapPins.querySelector('.map__card');
    if (card !== null) {
      return (+card.getAttribute('data-id') === i);
    }
    return false;
  }

  function open(i) {
    if (isAlreadyOpened(i)) {
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

'use strict';

(function () {
  var dependencies = {
    data: window.data,
    form: window.form,
    mainPin: window.mainPin,
  };

  var ENTER_KEYCODE = 13;
  var POSITION_UNIT = 'px';
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var currentCoords = {};

  function onDocumentMouseMove(evtMove) {
    var shift = {
      x: currentCoords.x - evtMove.clientX,
      y: currentCoords.y - evtMove.clientY
    };
    var pinMainTop = mainPin.offsetTop - shift.y;
    var pinMainLeft = mainPin.offsetLeft - shift.x;
    var pinHeight = mainPin.offsetHeight;
    var pinWidth = mainPin.offsetWidth;
    if (pinMainTop < (dependencies.data.MapLimit.Y_MIN - pinHeight)) {
      pinMainTop = dependencies.data.MapLimit.Y_MIN - pinHeight;
    }
    if (pinMainTop > (dependencies.data.MapLimit.Y_MAX - pinHeight)) {
      pinMainTop = dependencies.data.MapLimit.Y_MAX - pinHeight;
    }
    if (pinMainLeft < (dependencies.data.MapLimit.X_MIN - pinWidth / 2)) {
      pinMainLeft = dependencies.data.MapLimit.X_MIN - pinWidth / 2;
    }
    if (pinMainLeft > (dependencies.data.MapLimit.X_MAX - pinWidth / 2)) {
      pinMainLeft = dependencies.data.MapLimit.X_MAX - pinWidth / 2;
    }
    currentCoords.x = evtMove.clientX;
    currentCoords.y = evtMove.clientY;
    mainPin.style.top = pinMainTop + POSITION_UNIT;
    mainPin.style.left = pinMainLeft + POSITION_UNIT;
  }

  function onDocumentMouseUp() {
    dependencies.mainPin.fillCoordsInAddress();
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  }

  function onMainPinMouseUp() {
    dependencies.form.makePageActive();
    mainPin.removeEventListener('mouseup', onMainPinMouseUp);
  }

  function onMainPinEnterKeyDown(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      dependencies.form.makePageActive();
      mainPin.removeEventListener('keydown', onMainPinEnterKeyDown);
    }
  }

  function onMainPinMouseDown(evtMouseDown) {
    if (!dependencies.data.OFFERS) {
      return;
    }
    currentCoords.x = evtMouseDown.clientX;
    currentCoords.y = evtMouseDown.clientY;
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
    mainPin.addEventListener('mouseup', onMainPinMouseUp);
  }

  window.dnd = {
    onMainPinMouseDown: onMainPinMouseDown,
    onMainPinEnterKeyDown: onMainPinEnterKeyDown
  };
})();

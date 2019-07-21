'use strict';

(function () {
  var dependencies = {
    data: window.data
  };

  var main = document.querySelector('main');
  var templateErr = document.querySelector('#error').content.querySelector('.error');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');

  function close() {
    var msg = main.querySelector('.success');
    if (msg.classList.contains(dependencies.data.HIDDEN_CLASS)) {
      msg = main.querySelector('.error');
    }
    msg.classList.add(dependencies.data.HIDDEN_CLASS);
    removeWindowListeners();
  }

  function onEscKeyDown(evt) {
    if (evt.keyCode === dependencies.data.ESC_KEYCODE) {
      close();
    }
  }

  function onWindowClick() {
    close();
  }

  function addWindowListeners() {
    window.addEventListener('keydown', onEscKeyDown);
    window.addEventListener('click', onWindowClick);
  }

  function removeWindowListeners() {
    window.removeEventListener('keydown', onEscKeyDown);
    window.removeEventListener('click', onWindowClick);
  }

  function render() {
    renderMsg(templateSuccess);
    renderMsg(templateErr);
  }

  function renderMsg(template) {
    var msg = template.cloneNode(true);
    msg.classList.add(dependencies.data.HIDDEN_CLASS);
    main.appendChild(msg);
  }

  function showSuccess() {
    var msg = main.querySelector('.success');
    msg.classList.remove(dependencies.data.HIDDEN_CLASS);
  }

  function showError(msgText, callback) {
    var msg = main.querySelector('.error');
    var errMsg = msg.querySelector('.error__message');
    var errbtn = msg.querySelector('.error__button');
    errMsg.textContent = msgText;
    errbtn.addEventListener('click', function () {
      msg.classList.add(dependencies.data.HIDDEN_CLASS);
      callback();
    });
    msg.classList.remove(dependencies.data.HIDDEN_CLASS);
  }

  window.message = {
    render: render,
    showError: showError,
    showSuccess: showSuccess,
    addWindowListeners: addWindowListeners,
    removeWindowListeners: removeWindowListeners
  };
})();

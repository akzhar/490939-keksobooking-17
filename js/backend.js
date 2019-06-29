'use strict';

(function () {
  window.backend = {
    load: load
  };

  function load(onLoad) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000; // 10s
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.open('GET', URL);
    xhr.send();
  }

  function onError(msgText) {
    var main = document.querySelector('main');
    var templateErr = document.getElementById('error').content.querySelector('.error');
    var err = templateErr.cloneNode(true);
    var errMsg = err.querySelector('.error__message');
    errMsg.textContent = msgText;
    main.appendChild(err);
  }
})();

'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var maxResponseTime = 10000;
  var Status = {
    OK: 200
  };

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = maxResponseTime;
    xhr.addEventListener('load', function () {
      if (xhr.status === Status.OK) {
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

  window.backend = {
    load: load
  };
})();

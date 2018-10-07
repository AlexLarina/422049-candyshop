'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/candyshop';

  var setupRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    return xhr;
  };

  var download = function (onLoad, onError) {
    var xhr = setupRequest(onLoad, onError);
    xhr.open('GET', DATA_URL + '/data');
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = setupRequest(onLoad, onError);
    xhr.open('POST', DATA_URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();

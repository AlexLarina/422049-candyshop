'use strict';

(function () {
  var lastTimeout = null;

  var debounce = function (callback, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, interval);
  };

  window.debounce = debounce;

})();

'use strict';

(function () {
  var lastTimeout = null;
  /**
   * Возвращает случайное число в выбранном диапазоне
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var getRandomIntFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var debounce = function (callback, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, interval);
  };

  // window.getRandomIntFromRange = getRandomIntFromRange;
  window.debounce = debounce;

})();

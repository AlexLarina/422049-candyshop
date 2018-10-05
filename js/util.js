'use strict';

(function () {
  /**
   * Возвращает случайное число в выбранном диапазоне
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var getRandomIntFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.getRandomIntFromRange = getRandomIntFromRange;
})();

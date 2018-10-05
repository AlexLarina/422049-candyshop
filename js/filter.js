'use strict';

(function () {
  /**
   * Обработка кликов по пинам слайдера
   * @type {Element}
   */
  var leftRangeButton = document.querySelector('.range__btn--left');
  var rightRangeButton = document.querySelector('.range__btn--right');
  /**
   * Обработка перетаскивания левого пина слайдера
   */
  leftRangeButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var fillLine = document.querySelector('.range__fill-line');
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      var currentX = leftRangeButton.offsetLeft - shiftX;
      var rightButtonX = rightRangeButton.offsetLeft;

      if (currentX < 0) {
        currentX = 0;
      }
      if (currentX > rightButtonX - 10) {
        currentX = rightButtonX - 10;
      }

      leftRangeButton.style.left = currentX + 'px';
      fillLine.style.left = currentX + 'px';
      document.querySelector('.range__price--min').textContent = Math.floor(currentX * 100 /
        leftRangeButton.parentNode.offsetWidth);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  /**
   * Обработка перетаскивания правого пина слайдера
   */
  rightRangeButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var filter = document.querySelector('.range__filter');
    var fillLine = document.querySelector('.range__fill-line');
    var rightBorder = filter.offsetWidth;
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      var currentX = rightRangeButton.offsetLeft - shiftX;
      var leftButtonX = leftRangeButton.offsetLeft;

      if (currentX > rightBorder) {
        currentX = rightBorder;
      }
      if (currentX < leftButtonX + 10) {
        currentX = leftButtonX + 10;
      }

      rightRangeButton.style.left = currentX + 'px';
      fillLine.style.right = fillLine.parentNode.offsetWidth - currentX + 'px';
      document.querySelector('.range__price--max').textContent = Math.floor(currentX * 100 /
        rightRangeButton.parentNode.offsetWidth);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

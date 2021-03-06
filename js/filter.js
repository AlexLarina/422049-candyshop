'use strict';

(function () {
  var FILTER_SWITCH_DELAY = 1000;
  var INITIAL_PRICE = {
    Min: 0,
    Max: 0
  };
  var Price = {
    Min: 0,
    Max: 0
  };
  /**
   * Обработка кликов по пинам слайдера
   * @type {Element}
   */
  var leftRangeButton = document.querySelector('.range__btn--left');
  var rightRangeButton = document.querySelector('.range__btn--right');
  var priceRangeFillLine = document.querySelector('.range__fill-line');
  var rangeMinPrice = document.querySelector('.range__price--min');
  var rangeMaxPrice = document.querySelector('.range__price--max');
  var filters = document.querySelector('.catalog__sidebar');
  var rangeCount = filters.querySelector('.range__count');
  var favInput = filters.querySelector('#filter-favorite ~ span');
  var availabilityInput = filters.querySelector('#filter-availability ~ span');
  var totalCardAmount = 0;
  var isShowAll = false;
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
      if (currentX > rightButtonX) {
        currentX = rightButtonX;
      }

      leftRangeButton.style.left = currentX + 'px';
      fillLine.style.left = currentX + 'px';
      rangeMinPrice.textContent = Math.floor(currentX * 100 /
        leftRangeButton.parentNode.offsetWidth);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      Price.Min = rangeMinPrice.textContent;

      clearCatalog(catalog);
      window.debounce(window.catalog.update, FILTER_SWITCH_DELAY);

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

      if (currentX > rightBorder - 10) {
        currentX = rightBorder - 10;
      }
      if (currentX < leftButtonX) {
        currentX = leftButtonX;
      }

      rightRangeButton.style.left = currentX + 'px';
      fillLine.style.right = fillLine.parentNode.offsetWidth - currentX + 'px';
      rangeMaxPrice.textContent = Math.floor(currentX * 100 /
        rightRangeButton.parentNode.offsetWidth);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      Price.Max = rangeMaxPrice.textContent;

      clearCatalog(catalog);
      window.debounce(window.catalog.update, FILTER_SWITCH_DELAY);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  /**
   * Объект для хранения количества товаров разных видов
   * @type {{icecream: number, soda: number, gum: number, marmalade: number, marshmallows: number}}
   */
  var ProductTypeCount = {
    icecream: 0,
    soda: 0,
    gum: 0,
    marmalade: 0,
    marshmallows: 0
  };
  /**
   * Объект для синхронизации названий типов товаров в разметке и в приходящих с сервера данных
   * @type {{Мороженое: string, Газировка: string, Жевательная резинка: string, Мармелад: string, Зефир: string}}
   */
  var ProductType = {
    'Мороженое': 'icecream',
    'Газировка': 'soda',
    'Жевательная резинка': 'gum',
    'Мармелад': 'marmalade',
    'Зефир': 'marshmallows'
  };
  /**
   * Объект для хранения количества данных с заданным составом
   * @type {{sugar-free: number, vegetarian: number, gluten-free: number}}
   */
  var nutritionInfo = {
    'sugar-free': 0,
    'vegetarian': 0,
    'gluten-free': 0
  };
  /**
   * Количество товаров в наличии
   * @type {number}
   */
  var inStock = 0;
  /**
   * Подсчет количества товаров, удовлетворяющих различным типам и составам
   * @param {Array} dataArray
   * @return {number}
   */
  var filterCount = function (dataArray) {
    totalCardAmount = dataArray.length;
    Price.Min = dataArray[0].price;
    Price.Max = dataArray[0].price;
    dataArray.forEach(function (it) {
      var nutritionInfoKeys = Object.keys(nutritionInfo);

      if (it.nutritionFacts.sugar === true) {
        nutritionInfo[nutritionInfoKeys[0]]++;
      }

      if (it.nutritionFacts.vegetarian === true) {
        nutritionInfo[nutritionInfoKeys[1]]++;
      }

      if (it.nutritionFacts.gluten === true) {
        nutritionInfo[nutritionInfoKeys[2]]++;
      }

      if (it.amount > 0) {
        inStock++;
      }

      if (it.price < Price.Min) {
        Price.Min = it.price;
      }

      if (it.price > Price.Max) {
        Price.Max = it.price;
      }
      switch (true) {
        case (it.kind === 'Мороженое'):
          ProductTypeCount.icecream++;
          break;
        case (it.kind === 'Газировка'):
          ProductTypeCount.soda++;
          break;
        case (it.kind === 'Жевательная резинка'):
          ProductTypeCount.gum++;
          break;
        case (it.kind === 'Мармелад'):
          ProductTypeCount.marmalade++;
          break;
        case (it.kind === 'Зефир'):
          ProductTypeCount.marshmallows++;
          break;
      }
    });

    INITIAL_PRICE.Min = Price.Min;
    INITIAL_PRICE.Max = Price.Max;

    return Price.Max;
  };
  /**
   * Подсчет товаров в избранном
   * @param {number} total
   */
  var renderFavCount = function (total) {
    var favSpan = filters.querySelector('#filter-favorite ~ span.input-btn__item-count');
    favSpan.textContent = '(' + total + ')';
  };
  /**
   * Отрисовка количества товаров в соответствующих фильтрах
   */
  var renderFilterCount = function () {
    var productTypesKeys = Object.keys(ProductTypeCount);
    productTypesKeys.forEach(function (it) {
      var inputCount = filters.querySelector('#filter-' + it + '~ span');
      inputCount.textContent = '(' + ProductTypeCount[it] + ')';
    });

    var nutritionInfoKeys = Object.keys(nutritionInfo);
    nutritionInfoKeys.forEach(function (it) {
      var inputCount = filters.querySelector('#filter-' + it + '~ span');
      inputCount.textContent = '(' + nutritionInfo[it] + ')';
    });

    rangeMinPrice.textContent = Price.Min;
    rangeMaxPrice.textContent = Price.Max;
    favInput.textContent = '(' + 0 + ')';
    availabilityInput.textContent = '(' + inStock + ')';
    rangeCount.textContent = '(' + totalCardAmount + ')';
  };
  /**
   * Обработка кнопки "Показать все"
   * @type {Element}
   */
  var showAllBtn = filters.querySelector('.catalog__submit');
  showAllBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    isShowAll = true;

    resetPrice();
    filters.querySelector('form').reset();
    window.debounce(window.catalog.update, FILTER_SWITCH_DELAY);
  });
  /**
   * Фильтрация карточек по совокупности признаков
   * @param {Array} cards
   * @return {Array}
   */
  var filtrateCards = function (cards) {
    var filteredCardsArray = [];
    var checkedFilters = filters.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');

    var foodTypeFilters = Array.prototype.filter.call(checkedFilters, function (filter) {
      return filter.name === 'food-type';
    });

    var foodPropertiesFilters = Array.prototype.filter.call(checkedFilters, function (filter) {
      return filter.name === 'food-property';
    });

    var markFilters = Array.prototype.filter.call(checkedFilters, function (filter) {
      return filter.name === 'mark';
    });

    var temp = [];
    foodTypeFilters.forEach(function (currentFilter) {
      temp = filterByFoodType(cards, currentFilter);
      Array.prototype.push.apply(filteredCardsArray, temp);
    });
    foodPropertiesFilters.forEach(function (currentFilter) {
      temp = (filteredCardsArray.length === 0) ? filterByFoodProperty(cards, currentFilter) :
        filterByFoodProperty(filteredCardsArray, currentFilter);
      filteredCardsArray = temp;
    });

    filteredCardsArray = (filteredCardsArray.length === 0) ? filterByPrice(cards, Price.Min, Price.Max)
      : filterByPrice(filteredCardsArray, Price.Min, Price.Max);
    rangeCount.textContent = '(' + filteredCardsArray.length + ')';

    markFilters.forEach(function (currentFilter) {
      if (currentFilter.id === 'filter-availability') {
        filteredCardsArray = filterInStock(cards);
        resetPrice();
        filters.querySelector('form').reset();
      }

      if (currentFilter.id === 'filter-favorite') {
        filteredCardsArray = window.catalog.favouriteCards;
        resetPrice();
        filters.querySelector('form').reset();
      }
    });

    if (isShowAll) {
      filteredCardsArray = cards;
      isShowAll = false;
      resetPrice();
      filters.querySelector('form').reset();
    }
    return filteredCardsArray;
  };
  /**
   * Сортируем карточки товаров
   * @param {Array} filtered
   * @return {Array}
   */
  var sortCards = function (filtered) {
    var sortedArray = [];
    var checkedFilters = filters.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
    var sortFilters = Array.prototype.filter.call(checkedFilters, function (filter) {
      return filter.name === 'sort';
    });

    sortFilters.forEach(function (currentFilter) {
      if (currentFilter.id === 'filter-popular') {
        sortedArray = sortByPopularity(filtered);
      }

      if (currentFilter.id === 'filter-expensive') {
        sortedArray = sortByPriceDescrease(filtered);
      }

      if (currentFilter.id === 'filter-cheep') {
        sortedArray = sortByPriceInscrease(filtered);
      }

      if (currentFilter.id === 'filter-rating') {
        sortedArray = sortByRate(filtered);
      }
    });

    return sortedArray;
  };

  /**
   * Фильтрация товаров по типу
   * @param {Array} cards
   * @param {Node} filter
   * @return {Array} filtered Array
   */
  var filterByFoodType = function (cards, filter) {
    return cards.filter(function (card) {
      return filter.value === ProductType[card.kind];
    });
  };
  /**
   * Фильтрация товаров по составу
   * @param {Array} cards
   * @param {Node} filter
   * @return {Array} filtered Array
   */
  var filterByFoodProperty = function (cards, filter) {
    return cards.filter(function (card) {
      var property = filter.value.split('-')[0];
      return card.nutritionFacts[property] === true;
    });
  };
  /**
   * Фильтрация товаров по цене
   * @param {Array} cards
   * @param {number} min
   * @param {number} max
   * @return {Array} filtered Array
   */
  var filterByPrice = function (cards, min, max) {
    return cards.filter(function (card) {
      return card.price >= min && card.price <= max;
    });
  };
  /**
   * Фильтрация товаров по наличию
   * @param {Array} cards
   * @return {Array} filtered Array
   */
  var filterInStock = function (cards) {
    return cards.filter(function (card) {
      return card.amount > 0;
    });
  };
  /**
   * Сортировка товаров по уменьшению цены (сначала дорогие)
   * @param {Array} cards
   * @return {Array} sorted Array
   */
  var sortByPriceDescrease = function (cards) {
    var sortedCards = cards.slice();
    return sortedCards.sort(function (a, b) {
      return b.price - a.price;
    });
  };
  /**
   * Сортировка товаров по рейтингу
   * @param {Array} cards
   * @return {Array} sorted Array
   */
  var sortByRate = function (cards) {
    var sortedCards = cards.slice();
    return sortedCards.sort(function (a, b) {
      return (b.rating.value - a.rating.value) || (b.rating.number - a.rating.number);
    });
  };
  /**
   * Сортировка товаров по увеличению цены (сначала дешевые)
   * @param {Array} cards
   * @return {Array} sorted Array
   */
  var sortByPriceInscrease = function (cards) {
    var sortedCards = cards.slice();
    return sortedCards.sort(function (a, b) {
      return a.price - b.price;
    });
  };
  /**
   * При выборе фильтра "Сначала популярные" возвращаем карточки в том порядке, что получили с сервера
   * @param {Array} cards
   * @return {Array} sorted Array
   */
  var sortByPopularity = function (cards) {
    var sortedCards = cards.slice();
    return sortedCards;
  };
  /**
   * Очистка каталога
   * @type {Element}
   */
  var catalog = document.querySelector('.catalog__cards');
  var clearCatalog = function (catalogNode) {
    while (catalogNode.hasChildNodes()) {
      catalogNode.removeChild(catalogNode.lastChild);
    }
  };
  /**
   * Обработка выбора фильтров
   */
  filters.addEventListener('change', function () {
    clearCatalog(catalog);
    window.debounce(window.catalog.update, FILTER_SWITCH_DELAY);
  });
  /**
   * Отрисовка сообщения об ошибке для слишком строгих фильтров
   * @param {Node} errorMessage
   */
  var renderFilterError = function (errorMessage) {
    catalog.appendChild(errorMessage);
  };
  /**
   * Устанавливаем фильтры по цене в исходное состояние
   */
  var resetPrice = function () {
    leftRangeButton.style.left = 0;

    rightRangeButton.style.left = '';

    priceRangeFillLine.style.left = 0;
    priceRangeFillLine.style.right = 0;

    rangeMinPrice.textContent = INITIAL_PRICE.Min;
    rangeMaxPrice.textContent = INITIAL_PRICE.Max;
    Price.Min = INITIAL_PRICE.Min;
    Price.Max = INITIAL_PRICE.Max;
  };

  window.filter = {
    count: filterCount,
    render: renderFilterCount,
    cards: filtrateCards,
    error: renderFilterError,
    renderFav: renderFavCount,
    sortCards: sortCards
  };
})();

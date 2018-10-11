'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article.catalog__card');
  var catalog = document.querySelector('.catalog__cards');
  var catalogWrap = document.querySelector('.catalog__cards-wrap');
  var basketOrderCount = document.querySelector('.goods__total');

  var totalAmount = 0;
  var totalPrice = 0;
  var totalFav = 0;
  var cards = [];
  var favouriteCards = [];

  /**
   * Заполняет шаблон карточки данные и возвращает ноду
   * @param {object} card
   * @return {Node}
   */
  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.classList.remove('card--in-stock');
    switch (true) {
      case (card.amount > 5): cardElement.classList.add('card--in-stock'); break;
      case (card.amount >= 1 && card.amount <= 5): cardElement.classList.add('card--little'); break;
      case (card.amount > 0): cardElement.classList.add('card--soon'); break;
    }
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__img').src = 'img/cards/' + card.picture;
    cardElement.querySelector('.card__price').innerHTML =
      card.price + '<span class="card__currency"> ₽</span><span class="card__weight">/ ' + card.weight + ' Г</span>';
    var rating = cardElement.querySelector('.stars__rating');
    rating.classList.remove('stars__rating--five');
    switch (true) {
      case (card.rating.value === 1): rating.classList.add('stars__rating--one'); break;
      case (card.rating.value === 2): rating.classList.add('stars__rating--two'); break;
      case (card.rating.value === 3): rating.classList.add('stars__rating--three'); break;
      case (card.rating.value === 4): rating.classList.add('stars__rating--four'); break;
      case (card.rating.value === 5): rating.classList.add('stars__rating--five'); break;
    }
    cardElement.querySelector('.star__count').textContent = card.rating.number;
    cardElement.querySelector('.card__characteristic').textContent = (card.nutritionFacts.sugar) ?
      'Содержит сахар' : 'Без сахара';
    cardElement.querySelector('.card__composition-list').textContent = card.nutritionFacts.contents;

    var favButton = cardElement.querySelector('.card__btn-favorite');
    favButton.addEventListener('click', function (evt) {
      favButtonClickHandler(favButton, evt, card, cardElement);
    });

    var addToBasketButton = cardElement.querySelector('.card__btn');
    addToBasketButton.addEventListener('click', function () {
      addToBasketButton.href = '#basket';
      addToBasketHandler(card);
    });

    return cardElement;
  };

  /**
   * Обрабатывает добавление каждой карточки в избранное
   * @param {Node} element
   * @param {Event} evt
   * @param {Node} card
   * @param {Node} cardElement
   */
  var favButtonClickHandler = function (element, evt, card, cardElement) {
    evt.preventDefault();
    var favTitle = evt.target.parentNode.parentNode.parentNode.querySelector('.card__title').textContent;
    var favCardExist = false;
    element.classList.toggle('card__btn-favorite--selected');
    if (element.classList.contains('card__btn-favorite--selected')) {
      favouriteCards.forEach(function (it) {
        if (it.name === favTitle) {
          favCardExist = true;
        }
      });
      if (!favCardExist) {
        favouriteCards.push(card);
        cardElement.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
        totalFav++;
        window.filter.renderFav(totalFav);
      }
    } else {
      favouriteCards.forEach(function (it, index) {
        if (it.name === favTitle) {
          favouriteCards.splice(index, 1);
          totalFav--;
          window.filter.renderFav(totalFav);
        }
      });
    }
  };

  /**
   * Реализуем логику добавления товара в корзину
   * @param {Node} card
   */
  var addToBasketHandler = function (card) {
    var basket = document.querySelector('.goods__cards');
    var basketEmpty = basket.querySelector('.goods__card-empty');
    var existingOrders = basket.querySelectorAll('article.card-order');
    var cardForBasket = renderCardForBasket(card);
    var isCoincidence = false;

    window.order.inableOrder();

    totalAmount++;
    totalPrice += card.price;
    if (existingOrders.length !== 0) {
      for (var i = 0; i < existingOrders.length; i++) {
        var title = existingOrders[i].querySelector('.card-order__title').textContent;
        if (title === card.name && card.amount > 0) {
          existingOrders[i].querySelector('.card-order__count').value++;
          existingOrders[i].querySelector('.card-order__price').textContent =
            card.price * existingOrders[i].querySelector('.card-order__count').value;
          updateBasketCount(totalAmount, totalPrice);
          updateAmount(card);
          isCoincidence = true;
        }
      }

      if (!isCoincidence && card.amount > 0) {
        basket.appendChild(cardForBasket);
        updateBasketCount(totalAmount, totalPrice);
        updateAmount(card);
      }

    } else {
      basket.appendChild(cardForBasket);
      basketEmpty.classList.add('visually-hidden');
      basketOrderCount.classList.remove('visually-hidden');
      updateBasketCount(totalAmount, totalPrice);
      updateAmount(card);
    }

  };
  /**
   * Реализуем логику удаления товара из корзины
   * @param {Node} card
   * @param {event} evt
   */
  var removeFromBasketHandler = function (card, evt) {
    var cardToRemove = evt.currentTarget.parentNode;
    var cardOrderData = [];
    var cardPrice = 0;
    var cardAmount = 0;
    for (var i = 0; i < cardToRemove.childNodes.length; i++) {
      if (cardToRemove.childNodes[i].nodeName.toLowerCase() === 'div' &&
        cardToRemove.childNodes[i].classList.contains('card-order__main')) {
        cardOrderData = cardToRemove.childNodes[i].childNodes;
      }
    }

    for (var j = 0; j < cardOrderData.length; j++) {
      if (cardOrderData[j].nodeName.toLowerCase() === 'p'
        && cardOrderData[j].classList.contains('card-order__price')) {
        cardPrice = parseInt(cardOrderData[j].textContent.split(' ')[0], 10);
      }
      if (cardOrderData[j].nodeName.toLowerCase() === 'div'
        && cardOrderData[j].classList.contains('card-order__amount')) {
        cardAmount = parseInt(cardOrderData[j].childNodes[3].childNodes[3].value, 10);
      }
    }
    var basket = document.querySelector('.goods__cards');
    var existingOrders = basket.querySelectorAll('article.card-order');
    var basketEmpty = basket.querySelector('.goods__card-empty');
    totalAmount -= cardAmount;
    totalPrice -= cardPrice;
    updateBasketCount(totalAmount, totalPrice);
    basket.removeChild(card);

    if (existingOrders.length === 1) {
      basketOrderCount.classList.add('visually-hidden');
      basketEmpty.classList.remove('visually-hidden');
      window.order.disableOrder();
    }
  };

  /**
   * Заполняем данные корзины в шапке страницы актуальеым количеством и стоимостью товаров
   * @param {number} amount
   * @param {number} price
   */
  var updateBasketCount = function (amount, price) {
    var basketTotal = document.querySelector('.main-header__basket');
    basketTotal.textContent = 'В корзине ' + amount + ' ' + getCorrentEnding(amount) + ' за ' + price + ' Р.';
    basketOrderCount.querySelector('.goods__total-count').innerHTML = 'Итого за ' + amount + ' '
      + getCorrentEnding(amount) + ' <span class="goods__price">' + price + ' ₽</span>';
  };
  /**
   * Уменьшает количество данного товара на один пункт при добавлении товара в корзину
   * @param {Node} card
   * @param {number} amount
   * @return {number}
   */
  var updateAmount = function (card) {
    var updatedAmount = card.amount--;
    if (updatedAmount < 0) {
      updatedAmount = 0;
    }
    return updatedAmount;
  };

  /**
   * Обрабатываем верное окончание слова "товар" в зависимости от их количества
   * @param {number} value
   * @return {string}
   */
  var getCorrentEnding = function (value) {
    var itemName = 'товар';
    switch (value) {
      case 1:
        itemName = 'товар';
        break;
      case 2:
        itemName = 'товара';
        break;
      case 3:
        itemName = 'товара';
        break;
      case 4:
        itemName = 'товара';
        break;
      default: itemName = 'товаров';
    }

    return itemName;
  };
  /**
   * Модальное окно успешной загрузки данных
   * @type {Element}
   */
  var successModal = document.querySelector('#load-data').content.querySelector('.catalog__load');
  /**
   * Окно ошибки загрузки
   * @type {Element}
   */
  var errorModal = document.querySelector('.modal--error');
  /**
   * Обработка ошибки при запросе данных на сервер
   */
  var errorHandler = function () {
    errorModal.classList.remove('visually-hidden');
    window.order.clickCloseModalHandler(errorModal);
  };
  /**
   * Вставка фрагмента с карточками на страницу
   * @param {Array} array
   */
  var insertFragment = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderCard(array[i]));
    }
    catalog.appendChild(fragment);
  };
  /**
   * Обработка успешного запроса на сервер
   * @param {Array} data
   */
  var successHandler = function (data) {
    catalogWrap.appendChild(successModal);
    setInterval(function () {
      successModal.classList.add('visually-hidden');
    }, 1000);
    cards = data.slice();
    insertFragment(cards);
    window.filter.count(cards);
    window.filter.render();
  };

  window.backend.download(successHandler, errorHandler);
  /**
   * Шаблон карточки товара в корзине
   * @type {Element}
   */
  var cardInBasketTemplate = document.querySelector('#card-order').content.querySelector('article.goods_card');
  /**
   * Заполняет шаблон карточки товара в корзине и возвращает ноду карточки
   * @param {object} card
   * @return {Node}
   */
  var renderCardForBasket = function (card) {
    var cardInBasket = cardInBasketTemplate.cloneNode(true);
    cardInBasket.querySelector('.card-order__title').textContent = card.name;
    cardInBasket.querySelector('.card-order__img').src = 'img/cards/' + card.picture;
    cardInBasket.querySelector('.card-order__price').textContent = card.price + ' ₽';

    var removeFromBasket = cardInBasket.querySelector('.card-order__close');
    removeFromBasket.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeFromBasketHandler(cardInBasket, evt);
    });

    var increaseCardAmount = cardInBasket.querySelector('.card-order__btn--increase');
    increaseCardAmount.addEventListener('click', function () {
      if (card.amount >= 0) {
        cardInBasket.querySelector('.card-order__count').value++;
        cardInBasket.querySelector('.card-order__price').textContent =
          card.price * cardInBasket.querySelector('.card-order__count').value + ' ₽';
        totalAmount++;
        totalPrice += card.price;
      }
      updateBasketCount(totalAmount, totalPrice);
      updateAmount(card);
    });

    var decreaseCardAmount = cardInBasket.querySelector('.card-order__btn--decrease');
    decreaseCardAmount.addEventListener('click', function (evt) {
      if (cardInBasket.querySelector('.card-order__count').value > 1) {
        cardInBasket.querySelector('.card-order__count').value--;
        cardInBasket.querySelector('.card-order__price').textContent =
          card.price * cardInBasket.querySelector('.card-order__count').value + ' ₽';
        totalAmount--;
        totalPrice -= card.price;
      } else {
        removeFromBasketHandler(cardInBasket, evt);
        totalAmount--;
        totalPrice -= card.price;
      }
      updateBasketCount(totalAmount, totalPrice);
      updateAmount(card);
    });

    return cardInBasket;
  };
  /**
   * Обновление списка товаров после фильтрации
   */
  var updateCatalog = function () {
    var filteredCards = window.filter.cards(cards);
    if (filteredCards.length !== 0) {
      insertFragment(filteredCards);
    } else {
      window.filter.error();
    }
  };

  window.catalog = {
    update: updateCatalog,
    favouriteCards: favouriteCards
  };
})();

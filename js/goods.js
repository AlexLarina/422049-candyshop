'use strict';

/**
 * Количество карточек товаров на странице
 * @type {number}
 */
var ITEMS_NUMBER = 6;
/**
 * Данные для заполнения карточек товаров
 * @type {{NAMES: [string], IMG: [string], SUGAR: [boolean,boolean], CONTENTS: [string]}}
 */
var cardsData = {
  NAMES: [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ],
  IMG: [
    'gum-cedar',
    'gum-chile',
    'gum-eggplant',
    'gum-mustard',
    'gum-portwine',
    'gum-wasabi',
    'ice-cucumber',
    'ice-eggplant',
    'ice-garlic',
    'ice-italian',
    'ice-mushroom',
    'ice-pig',
    'marmalade-beer',
    'marmalade-caviar',
    'marmalade-corn',
    'marmalade-new-year',
    'marmalade-sour',
    'marshmallow-bacon',
    'marshmallow-beer',
    'marshmallow-shrimp',
    'marshmallow-spicy',
    'marshmallow-wine',
    'soda-bacon',
    'soda-celery',
    'soda-cob',
    'soda-garlic',
    'soda-peanut-grapes',
    'soda-russian'
  ],
  SUGAR: [true, false],
  CONTENTS: [
    'молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'
  ]
};

/**
 * Константы для заполнения карточек товаров
 * @type {{MIN: number, MAX: number}}
 */
var AMOUNT = {
  MIN: 0,
  MAX: 20
};
/**
 * Константы для заполнения карточек товаров
 * @type {{MIN: number, MAX: number}}
 */
var PRICE = {
  MIN: 100,
  MAX: 1500
};
/**
 * Константы для заполнения карточек товаров
 * @type {{MIN: number, MAX: number}}
 */
var WEIGHT = {
  MIN: 30,
  MAX: 300
};
/**
 * Константы для заполнения карточек товаров
 * @type {{MIN: number, MAX: number}}
 */
var RATING_VALUE = {
  MIN: 1,
  MAX: 5
};
/**
 * Константы для заполнения карточек товаров
 * @type {{MIN: number, MAX: number}}
 */
var RATING_NUMBER = {
  MIN: 10,
  MAX: 900
};
/**
 * Константы для заполнения карточек товаров
 * @type {{MIN: number, MAX: number}}
 */
var ENERGY = {
  MIN: 70,
  MAX: 500
};
/**
 * Записываем в переменную шаблон верстки карточки;
 * @type {Element}
 */
var cardTemplate = document.querySelector('#card').content.querySelector('article.catalog__card');
var catalog = document.querySelector('.catalog__cards');
var basketOrderCount = document.querySelector('.goods__total');
var totalAmount = 0;
var totalPrice = 0;

/**
 * Возвращает случайное число в выбранном диапазоне
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomIntFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Возвращает состав товара, сформированный случайным набором элементов массива "contents", в виде строки
 * @param {array} allContentsArray
 * @return {string}
 */
var createCardContent = function (allContentsArray) {
  var contentsNumber = getRandomIntFromRange(1, allContentsArray.length);
  var contentItemArray = [];
  while (contentItemArray.length < contentsNumber) {
    var currentItem = allContentsArray[getRandomIntFromRange(0, allContentsArray.length)];
    if (contentItemArray.indexOf(currentItem) === -1) {
      contentItemArray.push(currentItem);
    }
  }
  return contentItemArray.join(', ');
};

/**
 * Формирует и возвращает объект, содержащий данные об одном товаре
 * @param {string} pic
 * @param {array} contentsArray
 * @return {object}
 */
var createCard = function () {
  return {
    name: cardsData.NAMES[getRandomIntFromRange(0, cardsData.NAMES.length)],
    picture: 'img/cards/' + cardsData.IMG[getRandomIntFromRange(0, cardsData.IMG.length)] + '.jpg',
    amount: getRandomIntFromRange(AMOUNT.MIN, AMOUNT.MAX),
    price: getRandomIntFromRange(PRICE.MIN, PRICE.MAX),
    weight: getRandomIntFromRange(WEIGHT.MIN, WEIGHT.MAX),
    rating: {
      value: getRandomIntFromRange(RATING_VALUE.MIN, RATING_VALUE.MAX),
      number: getRandomIntFromRange(RATING_NUMBER.MIN, RATING_NUMBER.MAX)
    },
    nutritionFacts: {
      sugar: cardsData.SUGAR[getRandomIntFromRange(0, cardsData.SUGAR.length)],
      energy: getRandomIntFromRange(ENERGY.MIN, ENERGY.MAX),
      contents: createCardContent(cardsData.CONTENTS)
    }
  };
};

/**
 * Возвращает массив данных для карточек товаров
 * @param {number} itemsNumber
 * @return {Array}
 */
var createCardsArray = function (itemsNumber) {
  var itemsArray = [];
  for (var i = 0; i < itemsNumber; i++) {
    itemsArray.push(createCard());
  }
  return itemsArray;
};

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
  cardElement.querySelector('.card__img').src = card.picture;
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
  favButton.addEventListener('click', function () {
    favButton.classList.toggle('card__btn-favorite--selected');
  });

  var addToBasketButton = cardElement.querySelector('.card__btn');
  addToBasketButton.addEventListener('click', function () {
    addToBasketButton.href = '#basket';
    addToBasketHandler(card);
  });

  return cardElement;
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
    basketEmpty.classList.remove('visually-hidden');
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
 * Формируем массив нод-элементов карточек
 * @type {Array}
 */
var cardsArray = createCardsArray(ITEMS_NUMBER);

/**
 * Добавляем массив нод-элементов карточек во фрагмент
 * @type {DocumentFragment}
 */
var fragment = document.createDocumentFragment();
for (var i = 0; i < ITEMS_NUMBER; i++) {
  fragment.appendChild(renderCard(cardsArray[i]));
}
/**
 * Вставляем фрагмент в разметку каталога
 */
catalog.appendChild(fragment);
/**
 * Шаблон карточки товара в корзине
 * @type {Element}
 */
var cardInBasketTemplate = document.querySelector('#card-order').content.querySelector('article.goods_card');
/**
 * Корзина
 * @type {Element}
 */
/**
 * Заполняет шаблон карточки товара в корзине и возвращает ноду карточки
 * @param {object} card
 * @return {Node}
 */
var renderCardForBasket = function (card) {
  var cardInBasket = cardInBasketTemplate.cloneNode(true);
  cardInBasket.querySelector('.card-order__title').textContent = card.name;
  cardInBasket.querySelector('.card-order__img').src = card.picture;
  cardInBasket.querySelector('.card-order__price').textContent = card.price + ' ₽';

  var removeFromBasket = cardInBasket.querySelector('.card-order__close');
  removeFromBasket.addEventListener('click', function (evt) {
    removeFromBasketHandler(cardInBasket, evt);
  });

  return cardInBasket;
};

/**
 * Реализаия переключения вкладок в форме оформления заказа
 * @type {Element}
 */
var courierDeliveryInput = document.querySelector('#deliver__courier');
var selfDeliveryInput = document.querySelector('#deliver__store');
var selfDeliveryBlock = document.querySelector('.deliver__store');
var courierDeliveryBlock = document.querySelector('.deliver__courier');

courierDeliveryInput.addEventListener('click', function () {
  selfDeliveryBlock.classList.add('visually-hidden');
  courierDeliveryBlock.classList.remove('visually-hidden');
});
selfDeliveryInput.addEventListener('click', function () {
  courierDeliveryBlock.classList.add('visually-hidden');
  selfDeliveryBlock.classList.remove('visually-hidden');
});

/**
 * Обработка кликов по пинам слайдера
 * @type {Element}
 */
var leftRangeButton = document.querySelector('.range__btn--left');
leftRangeButton.addEventListener('click', function () {
  document.querySelector('.range__price--min').textContent = Math.floor(leftRangeButton.offsetLeft * 100 /
    leftRangeButton.parentNode.offsetWidth);
});
var rightRangeButton = document.querySelector('.range__btn--right');
rightRangeButton.addEventListener('click', function () {
  document.querySelector('.range__price--max').textContent = Math.floor(rightRangeButton.offsetLeft * 100 /
    rightRangeButton.parentNode.offsetWidth);
});

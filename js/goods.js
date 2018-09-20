'use strict';

/**
 * Количество карточек товаров на странице
 * @type {number}
 */
var ITEMS_NUMBER = 26;
/**
 * Количество товаров в корзине
 * @type {number}
 */
var ITEMS_IN_BASKET = 3;
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
var createCard = function (pic, contentsArray) {
  return {
    name: cardsData.NAMES[getRandomIntFromRange(0, cardsData.NAMES.length)],
    picture: 'img/cards/' + pic + '.jpg',
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
      contents: createCardContent(contentsArray)
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
    itemsArray.push(createCard(cardsData.IMG[i], cardsData.CONTENTS));
  }

  return itemsArray;
};

/**
 * Записываем в переменную шаблон верстки карточки;
 * @type {Element}
 */
var cardTemplate = document.querySelector('#card').content.querySelector('article.catalog__card');

var catalog = document.querySelector('.catalog__cards');

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
  return cardElement;
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
var basket = document.querySelector('.goods__cards');
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
  return cardInBasket;
};
/**
 * Формируем массив нод-элементов карточек в корзине
 * @type {Array}
 */
var cardInBasketArray = createCardsArray(ITEMS_IN_BASKET);
/**
 * Добавляем массив нод-элементов карточек в корзине во фрагмент
 */
for (var j = 0; j < ITEMS_IN_BASKET; j++) {
  fragment.appendChild(renderCardForBasket(cardInBasketArray[j]));
}
/**
 * Вставляем фрагмент в разметку корзины
 */
basket.appendChild(fragment);


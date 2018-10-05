'use strict';

(function () {
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
   * Возвращает состав товара, сформированный случайным набором элементов массива "contents", в виде строки
   * @param {array} allContentsArray
   * @return {string}
   */
  var createCardContent = function (allContentsArray) {
    var contentsNumber = window.getRandomIntFromRange(1, allContentsArray.length);
    var contentItemArray = [];
    while (contentItemArray.length < contentsNumber) {
      var currentItem = allContentsArray[window.getRandomIntFromRange(0, allContentsArray.length)];
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
      name: cardsData.NAMES[window.getRandomIntFromRange(0, cardsData.NAMES.length)],
      picture: 'img/cards/' + cardsData.IMG[window.getRandomIntFromRange(0, cardsData.IMG.length)] + '.jpg',
      amount: window.getRandomIntFromRange(AMOUNT.MIN, AMOUNT.MAX),
      price: window.getRandomIntFromRange(PRICE.MIN, PRICE.MAX),
      weight: window.getRandomIntFromRange(WEIGHT.MIN, WEIGHT.MAX),
      rating: {
        value: window.getRandomIntFromRange(RATING_VALUE.MIN, RATING_VALUE.MAX),
        number: window.getRandomIntFromRange(RATING_NUMBER.MIN, RATING_NUMBER.MAX)
      },
      nutritionFacts: {
        sugar: cardsData.SUGAR[window.getRandomIntFromRange(0, cardsData.SUGAR.length)],
        energy: window.getRandomIntFromRange(ENERGY.MIN, ENERGY.MAX),
        contents: createCardContent(cardsData.CONTENTS)
      }
    };
  };

  window.createCard = createCard;
})();

'use strict';

(function () {
  var ESC_KEYCODE = 27;
  /**
   * Реализаия переключения вкладок в форме оформления заказа
   * @type {Element}
   */
  var buyingForm = document.querySelector('.buy form');
  var courierDeliveryInput = buyingForm.querySelector('#deliver__courier');
  var selfDeliveryInput = buyingForm.querySelector('#deliver__store');
  var selfDeliveryBlock = buyingForm.querySelector('.deliver__store');
  var courierDeliveryBlock = buyingForm.querySelector('.deliver__courier');
  var cardStatus = buyingForm.querySelector('.payment__card-status');
  /**
   * Делаем неактивными все инпуты в выбранном блоке
   * @param {Node} element
   */
  var disableInputs = function (element) {
    element.querySelectorAll('input').forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };
  /**
   * Делаем активными все интупы в выбранном блоке
   * @param {Node} element
   */
  var enableInputs = function (element) {
    element.querySelectorAll('input').forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };
  /**
   * Обрабатываем показ вкладки с курьерской доставкой
   */
  courierDeliveryInput.addEventListener('click', function () {
    courierDeliveryInputHandler();
  });
  /**
   * Обработчик кнопки курьерской доставки
   */
  var courierDeliveryInputHandler = function () {
    selfDeliveryBlock.classList.add('visually-hidden');
    enableInputs(courierDeliveryBlock);
    disableInputs(selfDeliveryBlock);
    courierDeliveryBlock.classList.remove('visually-hidden');
  };
  /**
   * Обрабатываем показ вкладки с самовывозом
   */
  selfDeliveryInput.addEventListener('click', function () {
    selfDeliveryInputHandler();
  });
  /**
   * Обработчик кнопки доставки самовывозом
   */
  var selfDeliveryInputHandler = function () {
    courierDeliveryBlock.classList.add('visually-hidden');
    enableInputs(selfDeliveryBlock);
    disableInputs(courierDeliveryBlock);
    selfDeliveryBlock.classList.remove('visually-hidden');
  };

  /**
   * Выбор способа оплаты
   */
  var chooseCashInput = buyingForm.querySelector('#payment__cash');
  var chooseCardInput = buyingForm.querySelector('#payment__card');
  var cashPaymentMessage = buyingForm.querySelector('.payment__cash-wrap');
  var cardDataForm = buyingForm.querySelector('.payment__card-wrap');
  var cardDataFormInputs = cardDataForm.querySelectorAll('input');

  /**
   * Обработчик выбора наличных как способа оплаты
   */
  chooseCashInput.addEventListener('click', function () {
    cardDataForm.classList.add('visually-hidden');
    cashPaymentMessage.classList.remove('visually-hidden');
    cardDataFormInputs.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  });
  /**
   * Обработчик выбора карты как способа оплаты
   */
  var chooseCardHandler = function () {
    cashPaymentMessage.classList.add('visually-hidden');
    cardDataForm.classList.remove('visually-hidden');
    cardDataFormInputs.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };
  chooseCardInput.addEventListener('click', function () {
    chooseCardHandler();
  });

  /**
   * Валидация электронной почты
   * @param {string} email
   * @return {boolean}
   */
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  /**
   * Валидация даты действия карты
   * @param {string} date
   * @return {boolean}
   */
  function validateDate(date) {
    var re = /^([1-9]|1[0-2])\/\d{2}/;
    return re.test(date);
  }
  /**
   * Валидация номера карты по алгоритму Луна
   * @param {string} numbers
   * @return {boolean}
   */
  function validateCardNumber(numbers) {
    var multipledOdds = numbers.split('').map(function (it, index) {
      return (index % 2 !== 0) ? parseInt(it, 10) : it * 2;
    });
    var decreasedNumbers = multipledOdds.map(function (it) {
      return (it >= 10) ? it - 9 : it;
    });
    var total = decreasedNumbers.reduce(function (sum, current) {
      return sum + current;
    }, 0);

    var result = total % 10 === 0 ? true : false;
    return result;
  }

  /**
   * Валидация имени владельца карты
   * @param {string} name
   * @return {boolean}
   */
  function validateCardHolderName(name) {
    var re = /([A-Z]+)[\s]([A-Z]+)/;
    return re.test(name);
  }

  /**
   * Валидация номера этажа
   * @param {number} number
   * @return {boolean}
   */
  function validateFloor(number) {
    var re = /\d+/;
    return re.test(number);
  }

  /**
   * Обработка ввода данных в поле электронной почты
   * @type {Element}
   */
  var emailInput = buyingForm.querySelector('#contact-data__email');
  emailInput.addEventListener('input', function (evt) {
    if (!validateEmail(evt.target.value) && evt.target.value !== '') {
      evt.target.setCustomValidity('Укажите корректный e-mail.');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  var isCardNumberValid = false;
  var isCardDateValid = false;
  var isCardCVCValid = false;
  var isCardNameValid = false;
  /**
   * Обработка ввода данных в поле номера карты
   * @type {Element}
   */
  var cardNumber = cardDataForm.querySelector('#payment__card-number');
  cardNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    if (!validateCardNumber(target.value)) {
      target.setCustomValidity('Некорректный номер карты');
    } else {
      isCardNumberValid = true;
      confirmCardStatus();
      target.setCustomValidity('');
    }
  });
  /**
   * Обработка ввода данных в поле даты валидности карты
   * @type {Element}
   */
  var cardDate = cardDataForm.querySelector('#payment__card-date');
  cardDate.addEventListener('change', function (evt) {
    if (!validateDate(evt.target.value)) {
      evt.target.setCustomValidity('Укажите корректную дату.');
    } else {
      isCardDateValid = true;
      confirmCardStatus();
      evt.target.setCustomValidity('');
    }
  });
  /**
   * Обработка ввода данных в поле CVC кода карты
   * @type {Element}
   */
  var cvcCode = cardDataForm.querySelector('#payment__card-cvc');
  cvcCode.addEventListener('change', function (evt) {
    if (evt.target.value.length !== 3) {
      evt.target.setCustomValidity('Укажите корректный CVC код.');
    } else {
      isCardCVCValid = true;
      confirmCardStatus();
      evt.target.setCustomValidity('');
    }
  });
  /**
   * Обработка ввода данных в поле имени владельца карты
   * @type {Element}
   */
  var cardholderName = cardDataForm.querySelector('#payment__cardholder');
  cardholderName.addEventListener('change', function (evt) {
    if (!validateCardHolderName(evt.target.value)) {
      evt.target.setCustomValidity('Укажите корректное имя.');
    } else {
      isCardNameValid = true;
      confirmCardStatus();
      evt.target.setCustomValidity('');
    }
  });
  /**
   * Изменение статуса карты при верном/неверном заполнении полей карты
   */
  var confirmCardStatus = function () {
    if (isCardNumberValid && isCardDateValid && isCardCVCValid && isCardNameValid) {
      cardStatus.textContent = 'Одобрен';
    }
  };

  var rejectCardStatus = function () {
    cardStatus.textContent = 'Не определен';
  };
  /**
   * Обработка ввода данных в поле Этаж
   * @type {Element}
   */
  var floor = document.querySelector('#deliver__floor');
  floor.addEventListener('change', function (evt) {
    if (!validateFloor(evt.target.value) && evt.target.value !== '') {
      evt.target.setCustomValidity('Этаж должен быть числом.');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  /**
   * Обработка отправки данных на сервер
   */
  buyingForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(buyingForm), successHandler, errorHandler);
    evt.preventDefault();
  });

  var successModal = document.querySelector('.modal--success');
  var errorModal = document.querySelector('.modal--error');
  /**
   * Обработка успешной отправки данных на сервер
   */
  var successHandler = function () {
    successModal.classList.remove('modal--hidden');
    clickCloseModalHandler(successModal);
    buyingForm.reset();
    rejectCardStatus();
    chooseCardHandler();
    selfDeliveryInputHandler();
  };
  /**
   * Обработка ошибки отправки данных
   */
  var errorHandler = function () {
    errorModal.classList.remove('modal--hidden');
    clickCloseModalHandler(errorModal);
  };
  /**
   * Обработка закрытия модального окна по клику
   * @param {Node} modal
   */
  var clickCloseModalHandler = function (modal) {
    var closeButton = modal.querySelector('.modal__close');
    closeButton.addEventListener('click', function () {
      modal.classList.add('modal--hidden');
    });
  };
  /**
   * Обработка закрытия модального окна по нажатию на ESC
   * @param {Event} evt
   */
  var keyCloseModalHandler = function (evt) {
    var modals = document.querySelectorAll('.modal');
    if (evt.keyCode === ESC_KEYCODE) {
      modals.forEach(function (modal) {
        modal.classList.add('modal--hidden');
      });
    }
  };

  document.addEventListener('keydown', function (evt) {
    keyCloseModalHandler(evt);
  });

  var stores = document.querySelector('.deliver__stores');
  /**
   * Обработка загрузки новой карты при переключении пунктов выдачи в форме
   */
  var updateMap = function () {
    var map = document.querySelector('.deliver__store-map-wrap img');
    var choosenStore = stores.querySelector('input[type=radio]:checked');
    map.src = 'img/map/' + choosenStore.value + '.jpg';
  };

  stores.addEventListener('change', function () {
    updateMap();
  });
  /**
   * Блокирование всех полей формы заказа
   */
  var disableWholeOrder = function () {
    var order = document.querySelector('#order');
    var inputs = order.querySelectorAll('input');
    inputs.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };
  /**
   * Разблокирование всех полей формы заказа
   */
  var inableWholeOrder = function () {
    var order = document.querySelector('#order');
    var inputs = order.querySelectorAll('input');
    inputs.forEach(function (it) {
      it.removeAttribute('disabled');
    });

    disableInputs(courierDeliveryBlock);
  };
  disableWholeOrder();
  window.order = {
    disableOrder: disableWholeOrder,
    inableOrder: inableWholeOrder,
    clickCloseModalHandler: clickCloseModalHandler
  };

})();

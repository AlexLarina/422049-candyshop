'use strict';

(function () {
  /**
   * Реализаия переключения вкладок в форме оформления заказа
   * @type {Element}
   */
  var buyingForm = document.querySelector('.buy form');
  var courierDeliveryInput = buyingForm.querySelector('#deliver__courier');
  var selfDeliveryInput = buyingForm.querySelector('#deliver__store');
  var selfDeliveryBlock = buyingForm.querySelector('.deliver__store');
  var courierDeliveryBlock = buyingForm.querySelector('.deliver__courier');
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
   * По умолчанию инпуты в блкое курьеской доставки выключены
   */
  disableInputs(courierDeliveryBlock);
  /**
   * Обрабатываем показ вкладки с курьерской доставкой
   */
  courierDeliveryInput.addEventListener('click', function () {
    selfDeliveryBlock.classList.add('visually-hidden');
    enableInputs(courierDeliveryBlock);
    disableInputs(selfDeliveryBlock);
    courierDeliveryBlock.classList.remove('visually-hidden');
  });
  /**
   * Обрабатываем показ вкладки с самовывозом
   */
  selfDeliveryInput.addEventListener('click', function () {
    courierDeliveryBlock.classList.add('visually-hidden');
    enableInputs(selfDeliveryBlock);
    disableInputs(courierDeliveryBlock);
    selfDeliveryBlock.classList.remove('visually-hidden');
  });

  /**
   * Выбор способа оплаты
   */
  var chooseCashInput = buyingForm.querySelector('#payment__cash');
  var chooseCardInput = buyingForm.querySelector('#payment__card');
  var cashPaymentMessage = buyingForm.querySelector('.payment__cash-wrap');
  var cardDataForm = buyingForm.querySelector('.payment__card-wrap');
  var cardDataFormInputs = cardDataForm.querySelectorAll('input');

  chooseCashInput.addEventListener('click', function () {
    cardDataForm.classList.add('visually-hidden');
    cashPaymentMessage.classList.remove('visually-hidden');
    cardDataFormInputs.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  });
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
    var multipledOdds = numbers.split('').map(function (it) {
      return (it % 2 === 0) ? parseInt(it, 10) : it * 2;
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
    if (!validateEmail(evt.target.value)) {
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
      changeCardStatus();
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
      changeCardStatus();
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
      changeCardStatus();
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
      changeCardStatus();
      evt.target.setCustomValidity('');
    }
  });
  /**
   * Изменение статуса карты при верном/неверном заполнении полей карты
   */
  var changeCardStatus = function () {
    var cardStatus = cardDataForm.querySelector('.payment__card-status');
    if (isCardNumberValid && isCardDateValid && isCardCVCValid && isCardNameValid) {
      cardStatus.textContent = 'Одобрен';
    }
  };
  /**
   * Обработка ввода данных в поле Этаж
   * @type {Element}
   */
  var floor = document.querySelector('#deliver__floor');
  floor.addEventListener('change', function (evt) {
    if (!validateFloor(evt.target.value)) {
      evt.target.setCustomValidity('Этаж должен быть числом.');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  buyingForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(buyingForm), successHandler, errorHandler);
    evt.preventDefault();
  });

  var successModal = document.querySelector('.modal--success');
  var errorModal = document.querySelector('.modal--error');
  var successHandler = function () {
    successModal.classList.remove('modal--hidden');
    closeModalHandler(successModal);
    buyingForm.reset();
    chooseCardHandler();
  };
  var errorHandler = function () {
    errorModal.classList.remove('modal--hidden');
    closeModalHandler(errorModal);
  };

  var closeModalHandler = function (modal) {
    var closeButton = modal.querySelector('.modal__close');
    closeButton.addEventListener('click', function () {
      modal.classList.add('modal--hidden');
    });
  };
})();

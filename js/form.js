'use strict';
(function () {
  const MAX_TITLE_LENGTH = 100;
  const MIN_TITLE_LENGTH = 30;
  const MAX_PRICE = 1000000;
  const SPECIAL_ROOM_COUNT = 100;
  const SPECIAL_ROOM_CAPACITY = 0;
  const MIN_PRICE_LIST = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
  const submitButton = document.querySelector(`.ad-form__submit`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.childNodes;
  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterElements = mapFilter.childNodes;
  const title = document.querySelector(`#title`);
  const price = document.querySelector(`#price`);
  const adress = document.querySelector(`#address`);
  const avatar = document.querySelector(`#avatar`);
  const timein = document.querySelector(`#timein`);
  const timeout = document.querySelector(`#timeout`);
  const typeOfRoom = document.querySelector(`#type`);
  const minPrice = MIN_PRICE_LIST[typeOfRoom.value];

  const disableElements = (elementsList, switcher) => {
    for (let item of elementsList) {
      item.disabled = switcher;
    }
  };
  const showForm = () => {
    adForm.classList.remove(`ad-form--disabled`);
    disableElements(adFormElements, false);
    disableElements(mapFilterElements, false);
  };
  const hideForm = () => {
    disableElements(adFormElements, true);
    disableElements(mapFilterElements, true);
    adForm.classList.add(`ad-form--disabled`);
  };
  const setTimeInOut = () => {
    timein.value = timeout.value;
  };
  const setTimeOutIn = () => {
    timeout.value = timein.value;
  };
  const changePriceAttribute = () => {
    const minPriceSelected = MIN_PRICE_LIST[typeOfRoom.value];
    price.setAttribute(`min`, minPriceSelected);
    price.setAttribute(`placeholder`, minPriceSelected);
  };
  const validateForm = () => {

    avatar.setAttribute(`accept`, `image/png, image/jpeg`);
    title.setAttribute(`required`, ``);
    title.setAttribute(`minlength`, MIN_TITLE_LENGTH);
    title.setAttribute(`maxlength`, MAX_TITLE_LENGTH);

    price.setAttribute(`required`, ``);
    price.type = `number`;
    price.setAttribute(`max`, MAX_PRICE);
    price.setAttribute(`min`, minPrice);
    price.setAttribute(`placeholder`, minPrice);

    adress.setAttribute(`readonly`, ``);

    typeOfRoom.removeEventListener(`change`, changePriceAttribute);
    typeOfRoom.addEventListener(`change`, changePriceAttribute);
    timein.removeEventListener(`change`, setTimeOutIn);
    timeout.removeEventListener(`change`, setTimeInOut);
    timein.addEventListener(`change`, setTimeOutIn);
    timeout.addEventListener(`change`, setTimeInOut);
  };
  const checkRooms = () => {
    const roomsCapacityElement = document.querySelector(`#capacity`);
    const roomsCountElement = document.querySelector(`#room_number`);
    const roomsCount = Number(roomsCountElement.value);
    const roomsCapacity = Number(roomsCapacityElement.value);
    if (roomsCount === SPECIAL_ROOM_COUNT && roomsCapacity !== SPECIAL_ROOM_CAPACITY) {
      roomsCapacityElement.setCustomValidity(`Количество комнат не соответствует количеству гостей.`);
      return;
    }
    if (roomsCapacity > roomsCount) {
      roomsCapacityElement.setCustomValidity(`Количество комнат не соответствует количеству гостей.`);
      return;
    }
    roomsCapacityElement.setCustomValidity(``);
  };
  submitButton.addEventListener(`click`, () => {
    checkRooms();
  });
  window.form = {
    show: showForm,
    hide: hideForm,
    validate: validateForm
  };

})();

'use strict';
(function () {
  const MAX_TITLE_LENGTH = 100;
  const MIN_TITLE_LENGTH = 30;
  const MAX_PRICE = 1000000;
  const MIN_PRICE_LIST = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
  const submitButton = document.querySelector(`.ad-form__submit`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.childNodes;
  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterElements = mapFilter.childNodes;

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
  const validateForm = () => {
    const title = document.querySelector(`#title`);
    const price = document.querySelector(`#price`);
    const adress = document.querySelector(`#address`);
    const avatar = document.querySelector(`#avatar`);
    const timein = document.querySelector(`#timein`);
    const timeout = document.querySelector(`#timeout`);
    const typeOfRoom = document.querySelector(`#type`);
    const minPrice = MIN_PRICE_LIST[typeOfRoom.value];

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

    typeOfRoom.addEventListener(`change`, () => {
      const minpriceChoosen = MIN_PRICE_LIST[typeOfRoom.value];
      price.setAttribute(`min`, minpriceChoosen);
      price.setAttribute(`placeholder`, minpriceChoosen);

    });
    timein.addEventListener(`change`, () => {
      timeout.value = timein.value;
    });
    timeout.addEventListener(`change`, () => {
      timein.value = timeout.value;
    });
  };
  const checkRooms = () => {
    const roomsCapacityElement = document.querySelector(`#capacity`);
    const roomsCountElement = document.querySelector(`#room_number`);
    const roomsCount = Number(roomsCountElement.value);
    const roomsCapacity = Number(roomsCapacityElement.value);
    if (roomsCount === 100 && roomsCapacity !== 0) {
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

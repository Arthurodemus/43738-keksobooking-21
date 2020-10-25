'use strict';
(function () {
  const submitButton = document.querySelector(`.ad-form__submit`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.childNodes;
  const mapFilter = document.querySelector(`.map__filters`);
  const mapFilterElements = mapFilter.childNodes;

  function disableElements(elementsList, switcher) {
    for (let item of elementsList) {
      item.disabled = switcher;
    }
  }
  function showForm() {
    adForm.classList.remove(`ad-form--disabled`);
    disableElements(adFormElements, false);
    disableElements(mapFilterElements, false);
  }
  function hideForm() {
    disableElements(adFormElements, true);
    disableElements(mapFilterElements, true);
    adForm.classList.add(`ad-form--disabled`);
  }
  function checkRooms() {
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
  }
  submitButton.addEventListener(`click`, function () {
    checkRooms();
  });
  window.form = {
    show: showForm,
    hide: hideForm
  };

})();

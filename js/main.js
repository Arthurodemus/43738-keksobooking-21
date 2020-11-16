'use strict';
(function () {

  const main = document.querySelector(`main`);
  const adForm = document.querySelector(`.ad-form`);
  const mapFilters = document.querySelector(`.map__filters`);

  const activatePage = () => {
    window.xhr.load(successHandler, onError);
    window.map.show();
    window.form.show();
    window.form.validate();
    window.map.pastePinAdress();
  };
  const deactivatePage = () => {
    window.map.hide();
    window.form.hide();
    window.map.pasteDefaultPinAdress();
    removePins();
    window.card.remove();
  };
  const isPageActive = () => !window.map.element.classList.contains(`map--faded`);
  const onError = (message) => {
    const errorBlock = document.createElement(`div`);
    errorBlock.style = `
    background-color: white;
    height: 150px;
    display: flex;
    top: 150px;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    right: 0px;
    color: black;
    font-size: 50px;
    `;
    errorBlock.textContent = message;
    window.map.element.appendChild(errorBlock);

  };

  const submitSuccessHandler = () => {
    const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successElement = successTemplate.cloneNode(true);

    main.insertAdjacentElement(`afterbegin`, successElement);

    document.addEventListener(`keydown`, successMessageEscHandler);
    document.addEventListener(`click`, successMessageClickHandler);
  };

  const successMessageClose = () => {
    const successElement = document.querySelector(`.success`);
    successElement.remove();

    document.removeEventListener(`keydown`, successMessageEscHandler);
    document.removeEventListener(`click`, successMessageClickHandler);
  };

  const successMessageClickHandler = () => {
    successMessageClose();
  };

  const successMessageEscHandler = (evt) => {
    if (evt.key === `Escape`) {
      successMessageClose();
    }
  };
  const removePins = () => {
    const pins = window.map.element.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach(function (pin) {
      pin.remove();
    });
  };
  const reset = document.querySelector(`.ad-form__reset`);
  reset.addEventListener(`click`, () => {
    deactivatePage();
  });
  const submitFormHandler = (evt) => {
    evt.preventDefault();
    window.xhr.load(submitSuccessHandler, onError, new FormData(adForm));
    adForm.reset();
    mapFilters.reset();
    deactivatePage();
  };
  adForm.addEventListener(`submit`, submitFormHandler);
  deactivatePage();

  const filterFormChangeHandler = window.debounce.debounce((pinsData) => {
    removePins();
    window.card.remove();
    window.pins.create(pinsData);
  });
  const successHandler = (pinsData) => {
    window.pins.create(pinsData);

    mapFilters.addEventListener(`change`, function () {
      filterFormChangeHandler(pinsData);
    });
  };


  window.map.mainPin.addEventListener(`keydown`, (evt) => {
    if (!isPageActive()) {
      window.util.isEnterEvent(evt, activatePage);
    }
  });
  window.map.mainPin.addEventListener(`mousedown`, (evt) => {
    if (!isPageActive()) {
      window.util.isMainMouseClickEvent(evt, activatePage);
    }
  });

})();

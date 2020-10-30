'use strict';
(function () {
  const activatePage = () => {
    window.map.show();
    window.form.show();
    window.form.validate();
    window.map.pastePinAdress();
  };
  const deactivatePage = () => {
    window.map.hide();
    window.form.hide();
    window.map.pasteDefaultPinAdress();
  };
  const isPageActive = () => !window.map.element.classList.contains(`map--faded`);

  deactivatePage();
  window.pins.create(window.data);
  window.card.create(window.data[0]);

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

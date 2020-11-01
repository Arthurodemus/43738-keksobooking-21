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

  deactivatePage();
  window.xhr.load(window.pins.create, onError);

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

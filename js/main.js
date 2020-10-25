'use strict';

function activatePage() {
  window.map.show();
  window.form.show();
  window.map.pastePinAdress();
}
function deactivatePage() {
  window.map.hide();
  window.form.hide();
  window.map.pasteDefaultPinAdress();
}
function isPageActive() {
  return !window.map.element.classList.contains(`map--faded`);
}

deactivatePage();
window.pins.create(window.data);
window.card.create(window.data);

window.map.mainPin.addEventListener(`keydown`, function (evt) {
  if (!isPageActive()) {
    window.util.isEnterEvent(evt, activatePage);
  }
});
window.map.mainPin.addEventListener(`mousedown`, function (evt) {
  if (!isPageActive()) {
    window.util.isMainMouseClickEvent(evt, activatePage);
  }
});

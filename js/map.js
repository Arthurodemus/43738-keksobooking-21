'use strict';
(function () {

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  function getCoordCenterOfBlock(element) {
    const blockWidth = element.offsetWidth;
    const blockHeight = element.offsetHeight;
    const widthCenter = element.offsetLeft + blockWidth / 2;
    const heightCenter = element.offsetTop + blockHeight / 2;
    return {x: widthCenter, y: heightCenter};
  }
  function getCoordOfPointer(element) {
    const blockWidth = element.offsetWidth;
    const blockHeight = element.offsetHeight;
    const widthCenter = element.offsetLeft + blockWidth / 2;
    const heightCenter = element.offsetTop + blockHeight;
    return {x: widthCenter, y: heightCenter};
  }
  function pasteAdress(pin) {
    const inputAdress = document.querySelector(`#address`);
    inputAdress.value = `${pin.x}, ${pin.y}`;
  }
  function showMap() {
    map.classList.remove(`map--faded`);
  }
  function hideMap() {
    map.classList.add(`map--faded`);
  }

  window.map = {
    element: map,
    mainPin: mapPinMain,
    hide: hideMap,
    show: showMap,
    pasteDefaultPinAdress: function pasteDefaultPinAdress() {
      pasteAdress(getCoordCenterOfBlock(mapPinMain));
    },
    pastePinAdress: function pastePinAdress() {
      pasteAdress(getCoordOfPointer(mapPinMain));
    }
  };

})();

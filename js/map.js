'use strict';
(function () {

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const getCoordCenterOfBlock = (element) => {
    const blockWidth = element.offsetWidth;
    const blockHeight = element.offsetHeight;
    const widthCenter = element.offsetLeft + blockWidth / 2;
    const heightCenter = element.offsetTop + blockHeight / 2;
    return {x: widthCenter, y: heightCenter};
  };
  const getCoordOfPointer = (element) => {
    const blockWidth = element.offsetWidth;
    const blockHeight = element.offsetHeight;
    const widthCenter = element.offsetLeft + blockWidth / 2;
    const heightCenter = element.offsetTop + blockHeight;
    return {x: widthCenter, y: heightCenter};
  };
  const pasteAdress = (pin) => {
    const inputAdress = document.querySelector(`#address`);
    inputAdress.value = `${pin.x}, ${pin.y}`;
  };
  const showMap = () => {
    map.classList.remove(`map--faded`);
  };
  const hideMap = () => {
    map.classList.add(`map--faded`);
  };

  window.map = {
    element: map,
    mainPin: mapPinMain,
    hide: hideMap,
    show: showMap,
    pasteDefaultPinAdress: () => {
      pasteAdress(getCoordCenterOfBlock(mapPinMain));
    },
    pastePinAdress: () => {
      pasteAdress(getCoordOfPointer(mapPinMain));
    }
  };

})();

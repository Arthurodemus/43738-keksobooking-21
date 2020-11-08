'use strict';
(function () {
  const MIN_COORDS_X = 0;
  const MAX_COORDS_X = 1200;
  const MIN_COORDS_Y = 130;
  const MAX_COORDS_Y = 630;
  const POINTER_HEIGHT = 22;

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
    const heightCenter = element.offsetTop + blockHeight + POINTER_HEIGHT;
    return {x: widthCenter, y: heightCenter};
  };
  const pasteAdress = (pin) => {
    const inputAdress = document.querySelector(`#address`);
    inputAdress.value = `${Math.round(pin.x)}, ${Math.round(pin.y)}`;
  };
  const showMap = () => {
    map.classList.remove(`map--faded`);
  };
  const hideMap = () => {
    map.classList.add(`map--faded`);
  };


  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;

      const coord = getCoordOfPointer(mapPinMain);

      if (coord.x < MIN_COORDS_X) {
        mapPinMain.style.left = `${MIN_COORDS_X - mapPinMain.offsetWidth / 2}px`;
      } else if (coord.x > MAX_COORDS_X) {
        mapPinMain.style.left = `${MAX_COORDS_X - mapPinMain.offsetWidth / 2}px`;
      }

      if (coord.y < MIN_COORDS_Y) {
        mapPinMain.style.top = `${MIN_COORDS_Y - mapPinMain.offsetHeight - POINTER_HEIGHT}px`;
      } else if (coord.y > MAX_COORDS_Y) {
        mapPinMain.style.top = `${MAX_COORDS_Y - mapPinMain.offsetHeight - POINTER_HEIGHT}px`;
      }

    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      pasteAdress(getCoordOfPointer(mapPinMain));
      map.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    map.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });


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

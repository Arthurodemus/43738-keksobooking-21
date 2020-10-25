'use strict';
(function () {
  function createPins(pinsData) {
    const fragment = document.createDocumentFragment();
    pinsData.forEach((object) => fragment.appendChild(generatePin(object)));
    const mapPins = document.querySelector(`.map__pins`);
    mapPins.appendChild(fragment);
  }

  function generatePin(pinObject) {
    const templateOrigin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const myTemplate = templateOrigin.cloneNode(true);
    myTemplate.querySelector(`img`).src = pinObject.author.avatar;
    myTemplate.querySelector(`img`).alt = pinObject.offer.title;
    myTemplate.style.left = `${pinObject.location.x}px`;
    myTemplate.style.top = `${pinObject.location.y}px`;
    return myTemplate;
  }
  window.pins = {
    create: createPins
  };
})();

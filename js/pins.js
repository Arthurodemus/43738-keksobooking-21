'use strict';
(function () {
  const MAX_PIN_COUNT = 5;
  const templateOrigin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = document.querySelector(`.map__pins`);
  const createPins = (pinsData) => {
    const fragment = document.createDocumentFragment();
    let filteredPins = window.filter.pinsData(pinsData).slice(0, MAX_PIN_COUNT);

    filteredPins.forEach((object) => fragment.appendChild(generatePin(object)));
    mapPins.appendChild(fragment);
  };
  const generatePin = (pinObject) => {
    const myTemplate = templateOrigin.cloneNode(true);
    const myImage = myTemplate.querySelector(`img`);
    myImage.src = pinObject.author.avatar;
    myImage.alt = pinObject.offer.title;
    myTemplate.style.left = `${pinObject.location.x}px`;
    myTemplate.style.top = `${pinObject.location.y}px`;
    myTemplate.addEventListener(`click`, () => {
      window.card.remove();
      window.card.create(pinObject);
    });

    return myTemplate;
  };
  window.pins = {
    create: createPins
  };
})();

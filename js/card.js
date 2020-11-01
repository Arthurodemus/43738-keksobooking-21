'use strict';
(function () {
  const COMPLIANCE_TYPES = {flat: `квартира`, bungalow: `Бунгало`, house: `Дом`, palace: `Дворец`};

  const removeCard = () => {
    const mapCard = window.map.element.querySelector(`.map__card`);
    if (mapCard !== null) {
      const popupClose = mapCard.querySelector(`.popup__close`);
      mapCard.remove();
      popupClose.removeEventListener(`click`, removeCard);
      document.removeEventListener(`keydown`, cardEscHandler);
    }
  };

  const cardEscHandler = (evt) => window.util.isEscEvent(evt, removeCard);

  const createCard = (pinsData) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(generateCard(pinsData));
    const mapPins = document.querySelector(`.map__pins`);
    mapPins.appendChild(fragment);

    if (pinsData.offer.photos.length === 0) {
      document.querySelector(`.popup__photos`).classList.add(`hidden`);
    }
    if (pinsData.offer.description === ``) {
      document.querySelector(`.popup__description`).classList.add(`hidden`);
    }
    if (pinsData.offer.address === ``) {
      document.querySelector(`.popup__text--address`).classList.add(`hidden`);
    }
    if (pinsData.offer.price === ``) {
      document.querySelector(`.popup__text--price`).classList.add(`hidden`);
    }
    if (pinsData.offer.features === ``) {
      document.querySelector(`.popup__features`).classList.add(`hidden`);
    }
    if (pinsData.offer.title === ``) {
      document.querySelector(`.popup__title`).classList.add(`hidden`);
    }
    if (pinsData.offer.rooms === `` || pinsData.offer.guests === ``) {
      document.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    }
    if (pinsData.offer.checkin === `` || pinsData.offer.checkout === ``) {
      document.querySelector(`.popup__text--time`).classList.add(`hidden`);
    }
    if (pinsData.offer.type === ``) {
      document.querySelector(`.popup__type`).classList.add(`hidden`);
    }
  };

  const generateCard = (cardItem) => {
    const templateOrigin = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const myTemplate = templateOrigin.cloneNode(true);
    const popupClose = myTemplate.querySelector(`.popup__close`);
    myTemplate.querySelector(`.popup__title`).textContent = cardItem.offer.title;
    myTemplate.querySelector(`.popup__text--address`).textContent = cardItem.offer.address;
    myTemplate.querySelector(`.popup__text--price`).textContent = `${cardItem.offer.price}₽/ночь`;
    myTemplate.querySelector(`.popup__type`).textContent = COMPLIANCE_TYPES[cardItem.offer.type];
    myTemplate.querySelector(`.popup__text--capacity`).textContent = `${cardItem.offer.rooms} комнаты для ${cardItem.offer.guests} гостей.`;
    myTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardItem.offer.checkin}, выезд до ${cardItem.offer.checkout}`;
    myTemplate.querySelector(`.popup__features`).textContent = cardItem.offer.features;
    myTemplate.querySelector(`.popup__description`).textContent = cardItem.offer.description;
    addPhotoCard(myTemplate, cardItem);
    myTemplate.querySelector(`.popup__photos img`).remove();
    myTemplate.querySelector(`.popup__avatar`).src = cardItem.author.avatar;

    popupClose.addEventListener(`click`, removeCard);
    document.addEventListener(`keydown`, cardEscHandler);

    return myTemplate;
  };
  const addPhotoCard = (myTemplate, cardItem) => {
    const placeForPhoto = myTemplate.querySelector(`.popup__photos`);
    cardItem.offer.photos.forEach((photoSrc) => {
      const photoCardTemplate = myTemplate.querySelector(`.popup__photos img`).cloneNode(true);
      photoCardTemplate.src = photoSrc;
      placeForPhoto.appendChild(photoCardTemplate);
    });
  };
  window.card = {
    create: createCard,
    remove: removeCard
  };

})();

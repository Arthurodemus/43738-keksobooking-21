'use strict';
(function () {
  const COMPLIANCE_TYPES = {flat: `квартира`, bungalow: `Бунгало`, house: `Дом`, palace: `Дворец`};

  function createCard(pinsData) {
    const fragment = document.createDocumentFragment();
    const firstDataElem = pinsData[0];
    if (firstDataElem.offer.photos.length === 0 || firstDataElem.offer.description === `` || firstDataElem.offer.address === ``) {
      return;
    }
    fragment.appendChild(generateCard(firstDataElem));
    const mapPins = document.querySelector(`.map__pins`);
    mapPins.appendChild(fragment);
  }

  function generateCard(cardItem) {
    const templateOrigin = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const myTemplate = templateOrigin.cloneNode(true);
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
    return myTemplate;
  }
  function addPhotoCard(myTemplate, cardItem) {
    const placeForPhoto = myTemplate.querySelector(`.popup__photos`);
    cardItem.offer.photos.forEach(function (photoSrc) {
      const photoCardTemplate = myTemplate.querySelector(`.popup__photos img`).cloneNode(true);
      photoCardTemplate.src = photoSrc;
      placeForPhoto.appendChild(photoCardTemplate);
    });
  }
  window.card = {
    create: createCard
  };

})();

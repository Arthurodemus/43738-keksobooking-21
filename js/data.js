'use strict';
(function () {
  const COUNT_OF_PINS = 8;
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MIN_ROOMS = 1;
  const MAX_ROOMS = 7;
  const MIN_PRICE = 1000;
  const MAX_PRICE = 9999;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 15;
  const MIN_X_LOCATION = 0;
  const MAX_X_LOCATION = document.querySelector(`.map`).offsetWidth;
  const TITLES = [`first`, `twice`, `third`, `quatro`];
  const DESCRIPTION = [`good rooms`, `bad rooms`, `nice`, `fine`, `not good`];
  const MIN_Y_LOCATION = 130;
  const MAX_Y_LOCATION = 630;

  function getRandomItem(array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  }
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }
  function getRandomSlice(array) {
    const maxCount = array.length - 1;
    return array.slice(0, getRandomNumber(0, maxCount));
  }
  function getPinsData(countOfObjects) {
    const pinsData = [];

    for (let i = 0; i < countOfObjects; i++) {

      const locationX = getRandomNumber(MIN_X_LOCATION, MAX_X_LOCATION);
      const locationY = getRandomNumber(MIN_Y_LOCATION, MAX_Y_LOCATION);

      const pin = {
        "author": {
          "avatar": `img/avatars/user0${i + 1}.png`
        },
        "offer": {
          "title": getRandomItem(TITLES),
          "address": `${locationX}, ${locationY}`,
          "price": getRandomNumber(MIN_PRICE, MAX_PRICE),
          "type": getRandomItem(TYPES),
          "rooms": getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          "guests": getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          "checkin": getRandomItem(TIMES),
          "checkout": getRandomItem(TIMES),
          "features": getRandomSlice(FEATURES),
          "description": getRandomItem(DESCRIPTION),
          "photos": getRandomSlice(PHOTOS),
        },
        "location": {
          "x": locationX,
          "y": locationY
        }
      };
      pinsData.push(pin);
    }
    return pinsData;
  }
  window.data = getPinsData(COUNT_OF_PINS);

})();

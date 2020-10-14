'use strict';
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
const ROOMS_CAPACITY = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
let pageActive = false;

function createPin(pinsData) {
  const fragment = document.createDocumentFragment();
  pinsData.forEach((object) => fragment.appendChild(generatePin(object)));
  const mapPins = document.querySelector(`.map__pins`);
  mapPins.appendChild(fragment);
}

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

function generatePin(pinObject) {
  const templateOrigin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const myTemplate = templateOrigin.cloneNode(true);
  myTemplate.querySelector(`img`).src = pinObject.author.avatar;
  myTemplate.querySelector(`img`).alt = pinObject.offer.title;
  myTemplate.style.left = `${pinObject.location.x}px`;
  myTemplate.style.top = `${pinObject.location.y}px`;
  return myTemplate;
}

function disableFormFields(fields, switcher) {
  for (let item of fields) {
    item.disabled = switcher;
  }
}

function showMap() {
  const map = document.querySelector(`.map`);
  map.classList.remove(`map--faded`);
  const adForm = document.querySelector(`.ad-form`);
  adForm.classList.remove(`ad-form--disabled`);
}

function getCoordCenterOfBlock(nameOfBlock) {
  const blockWidth = nameOfBlock.offsetWidth;
  const blockHeight = nameOfBlock.offsetHeight;
  const widthCenter = nameOfBlock.offsetLeft + blockWidth / 2;
  const heightCenter = nameOfBlock.offsetTop + blockHeight / 2;
  return {x: widthCenter, y: heightCenter};
}

function getCoordOfPointer(nameOfBlock) {
  const blockWidth = nameOfBlock.offsetWidth;
  const blockHeight = nameOfBlock.offsetHeight;
  const widthCenter = nameOfBlock.offsetLeft + blockWidth / 2;
  const heightCenter = nameOfBlock.offsetTop + blockHeight;
  return {x: widthCenter, y: heightCenter};
}

function pasteAdress(adress, mainPinCenter) {
  adress.value = `${mainPinCenter.x}, ${mainPinCenter.y}`;
}
function activatePage() {
  showMap();
  disableFormFields(fieldset, false);
  const mainPinPointer = getCoordOfPointer(mapPinMain);
  pasteAdress(inputAdress, mainPinPointer);
  pageActive = true;
}

function checkRooms() {
  const roomsCapacity = document.querySelector(`#capacity`);
  const roomsCount = document.querySelector(`#room_number`);
  if (ROOMS_CAPACITY[roomsCount.value].includes(roomsCapacity.value)) {
    roomsCapacity.setCustomValidity(``);
  } else {
    roomsCapacity.setCustomValidity(`Количество комнат не соответствует количеству гостей.`);
  }
}
function deactivatePage() {
  const map = document.querySelector(`.map`);
  map.classList.add(`map--faded`);
  const adForm = document.querySelector(`.ad-form`);
  adForm.classList.add(`ad-form--disabled`);
  const mainPinCenter = getCoordCenterOfBlock(mapPinMain);
  pasteAdress(inputAdress, mainPinCenter);
  pageActive = false;
}

const pinsData = getPinsData(COUNT_OF_PINS);
createPin(pinsData);

deactivatePage();

const adForm = document.querySelector(`.ad-form`);
const fieldset = adForm.querySelectorAll(`fieldset`);
disableFormFields(fieldset, true);

const inputAdress = document.querySelector(`#address`);
const mapPinMain = document.querySelector(`.map__pin--main`);

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
});
mapPinMain.addEventListener(`mousedown`, function () {
  if (pageActive === false) {
    activatePage();
  }
});

const submitButton = document.querySelector(`.ad-form__submit`);
submitButton.addEventListener(`click`, function () {
  checkRooms();
});



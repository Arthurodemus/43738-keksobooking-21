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
const MAIN_MOUSE_BUTTON = 0;

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


function disableElements(elementsList, switcher) {
  for (let item of elementsList) {
    item.disabled = switcher;
  }
}
function showMap() {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
}
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
function pasteAdress(adress, mainPinCenter) {
  adress.value = `${mainPinCenter.x}, ${mainPinCenter.y}`;
}
function activatePage() {
  showMap();
  disableElements(adFormElements, false);
  disableElements(mapFilterElements, false);
  const mainPinPointer = getCoordOfPointer(mapPinMain);
  pasteAdress(inputAdress, mainPinPointer);
}
function checkRooms() {
  const roomsCapacityElement = document.querySelector(`#capacity`);
  const roomsCountElement = document.querySelector(`#room_number`);
  const roomsCount = Number(roomsCountElement.value);
  const roomsCapacity = Number(roomsCapacityElement.value);
  if (roomsCount === 100 && roomsCapacity !== 0) {
    roomsCapacityElement.setCustomValidity(`Количество комнат не соответствует количеству гостей.`);
    return;
  }
  if (roomsCapacity > roomsCount) {
    roomsCapacityElement.setCustomValidity(`Количество комнат не соответствует количеству гостей.`);
    return;
  }
  roomsCapacityElement.setCustomValidity(``);
}
function deactivatePage() {
  map.classList.add(`map--faded`);
  disableElements(adFormElements, true);
  disableElements(mapFilterElements, true);
  adForm.classList.add(`ad-form--disabled`);

  const mainPinCenter = getCoordCenterOfBlock(mapPinMain);
  pasteAdress(inputAdress, mainPinCenter);
}
function isPageActive() {
  if (map.classList.contains(`map--faded`)) {
    return false;
  }
  return true;
}


const pinsData = getPinsData(COUNT_OF_PINS);
createPin(pinsData);

const map = document.querySelector(`.map`);
const inputAdress = document.querySelector(`#address`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.childNodes;
const mapFilter = document.querySelector(`.map__filters`);
const mapFilterElements = mapFilter.childNodes;
deactivatePage();

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (!isPageActive() && evt.key === `Enter`) {
    activatePage();
  }
});
mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (!isPageActive() && evt.button === MAIN_MOUSE_BUTTON) {
    activatePage();
  }
});

const submitButton = document.querySelector(`.ad-form__submit`);
submitButton.addEventListener(`click`, function () {
  checkRooms();
});



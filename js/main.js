'use strict';
const COUNT_OF_OBJECTS = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAX_X_LOCATION = document.querySelector(`.map`).offsetWidth;


let data = getData(COUNT_OF_OBJECTS);
createPin(data);

function createPin(someData) {
  let fragment = document.createDocumentFragment();
  someData.forEach((object) => fragment.appendChild(generatePin(object)));
  let mapPins = document.querySelector(`.map__pins`);
  mapPins.appendChild(fragment);
}

function getRandomItem(array) {
  return array[Math.round(Math.random() * (array.length - 1))];
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function getData(countOfObjects) {

  let someData = [];
  for (let i = 0; i < countOfObjects; i++) {
    someData.push({
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`
      },
      "offer": {
        "title": `строка, заголовок предложения`,
        "address": `600, 350`,
        "price": `1200`,
        "type": getRandomItem(TYPES),
        "rooms": 21,
        "guests": 210,
        "checkin": getRandomItem(TIMES),
        "checkout": getRandomItem(TIMES),
        "features": getRandomItem(FEATURES),
        "description": `строка с описанием`,
        "photos": getRandomItem(PHOTOS),
      },
      "location": {
        "x": getRandomNumber(0, MAX_X_LOCATION),
        "y": getRandomNumber(130, 630)
      }
    });
  }
  return someData;
}

function generatePin(someObject) {
  let templateOrigin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let myTemplate = templateOrigin.cloneNode(true);
  myTemplate.querySelector(`img`).src = someObject.author.avatar;
  myTemplate.querySelector(`img`).alt = someObject.offer.title;
  myTemplate.style.left = `${someObject.location.x}px`;
  myTemplate.style.top = `${someObject.location.y}px`;
  return myTemplate;
}

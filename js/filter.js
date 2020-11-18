'use strict';

(function () {
  const MAX_PINS_DISPLAY = 5;
  const ANY_VALUE = `any`;
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);

  const pricePerRoom = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  const filterHouses = (pinsData, filter) => {
    if (filter.value === ANY_VALUE) {
      return true;
    }
    return pinsData.toString() === filter.value;
  };

  const filterHousesPrice = (pinsData, filter) => {
    if (filter.value === ANY_VALUE) {
      return true;
    }
    return pinsData >= pricePerRoom[filter.value].min && pinsData <= pricePerRoom[filter.value].max;
  };

  const filterHousesCheckbox = (pinsData) => {
    const housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

    return Array.from(housingCheckbox).every((feature) => pinsData.indexOf(feature.value) >= 0);
  };

  const filterPinsData = (pinsData) => {
    let filteredPins = [];
    for (let i = 0; i < pinsData.length; i++) {
      if (filterHouses(pinsData[i].offer.type, housingType) &&
        filterHousesPrice(pinsData[i].offer.price, housingPrice) &&
        filterHouses(pinsData[i].offer.rooms, housingRooms) &&
        filterHouses(pinsData[i].offer.guests, housingGuests) &&
        filterHousesCheckbox(pinsData[i].offer.features)) {
        filteredPins.push(pinsData[i]);
      }
      if (filteredPins.length === MAX_PINS_DISPLAY) {
        break;
      }
    }
    return filteredPins;
  };

  window.filter = {
    pinsData: filterPinsData
  };
})();
